/** @format */

import React, {
  useRef,
  useState,
  useEffect,
  Fragment,
  useContext,
  createContext,
  useCallback,
  useImperativeHandle,
  forwardRef,
  ForwardedRef
} from "react";
import type { FC, ReactNode } from "react";
import styles from "./index.less";

type ContainerCellProps = {
  rowData: CellType;
  cellClassName?: string;
  children: ReactNode;
};
const ContainerCell: FC<ContainerCellProps> = ({
  children,
  rowData,
  cellClassName = "",
}) => {
  return (
    <div
      className={`${styles.cell} ${cellClassName}`}
      style={{
        top: `${rowData?.position?.top}px`,
        height: `${rowData?.position?.height}px`,
      }}
    >
      {children}
    </div>
  );
};

type PreloadCellsProps = {
  rowData: CellRowDataType;
  cellClassName?: string;
  children: ReactNode;
  updateHeight: ({ item, height }: { item: CellRowDataType, height: number }) => void
};
const PreloadCells: FC<PreloadCellsProps> = ({
  children,
  rowData,
  cellClassName = "", updateHeight,
}) => {
  const cell = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const preMount = () => {
      if (cell?.current) {
        updateHeight({
          item: rowData, height: cell.current.clientHeight
        })
      }
    }
    preMount()
  }, [rowData]);


  return (
    <div
      ref={cell}
      className={`${styles.cell} ${cellClassName}`}
      style={{
        top: `${rowData?.position?.top || 0}px`,
      }}
    >
      {children}
    </div>
  );
};


type UpdateHeightParams = {
  data: CellRowDataType;
  height: number
}

type PreloadData = CellRowDataType & {
  updateHeight?: (data: UpdateHeightParams) => void
}


type CellRowDataType = {
  id: string | number;
  [key: string]: any;
};

type CellPosition = DOMRect;
interface CellType {
  data: CellRowDataType;
  position?: CellPosition;
  index: number,
  className: string
}

interface CellClassNameParams {
  data: CellRowDataType;
  index: number;
}

type VirtualScrollProps = {
  initList?: CellRowDataType[];
  loadMoreData: () => Promise<CellRowDataType[] | undefined>;
  hasNext: Boolean;
  onRenderCell: (data: CellRowDataType) => JSX.Element;
  preSetCellHeight?: number;
  getCellHeight?: (row: CellRowDataType, width?: number) => number;
  cellClassName?: string | ((callData: CellClassNameParams) => string);
};

const VirtualScroll: FC<VirtualScrollProps> = ({
  loadMoreData,
  hasNext,
  onRenderCell,
  preSetCellHeight = 50,
  cellClassName = "",
  getCellHeight,
  initList = [],
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const button = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // 容器高度做虚拟滚动
  const [height, setHeight] = useState<number>(0);
  // 加工过带位置高度的列表
  const [list, setList] = useState<(CellType)[]>([]);
  // 新加入的数据
  const [appends, setAppends] = useState<CellRowDataType[]>([...initList]);
  const [preload, setPreload] = useState<CellRowDataType | undefined>(undefined)
  // 新节点渲染出来的dom
  const preloadRef = useRef(null)
  // 视口可以看到的高度
  const [visibleList, setVisibleList] = useState<CellType[]>([]);

  const updateHeight = useCallback((d: any, h: any) => {
    const l = [...list];
    // 更新当前那一项的高度
    const index = l.findIndex((i) => i?.data.id === d.id);
    if (index >= 0) {
      const pre = l[index - 1];
      const item = l[index];
      item.position = {
        ...item.position,
        height: h,
        top: pre?.position?.bottom || 0,
        bottom: (pre?.position?.bottom || 0) + h,
      };
      l.splice(index, 1, item)
      setList(l);
    }
    // 修正子项和预设高度之间的误差
    setHeight(height + h - preSetCellHeight);
  }, [height, list, preSetCellHeight]);

  const generatorNode = (item: CellRowDataType, length: number) => {
    let className: string = "";
    const node = {
      data: item,
      index: length,
    };
    if (typeof cellClassName === "function") {
      className = cellClassName(node);
    } else {
      className = cellClassName;
    }
    return { ...node, className, position: undefined };
  }



  useEffect(() => {
    const appendList = [...appends]
    // const proMountFirst = (first) => {
    //   const preMountPromise = new Promise((resolve, reject) => {
    //     setPreload(first)
    //     if (first) {
    //       first.updateHeight = resolve
    //     }
    //   })
    //   return preMountPromise
    // }
    // async function loopMount(array) {
    //   await array.reduce(async (previousPromise, item) => {
    //     await previousPromise;
    //     const res = await proMountFirst(item);
    //     console.log(res);
    //   }, Promise.resolve());
    // }


    // loopMount(appendList)

    const proMountFirst = (first: PreloadData): Promise<PreloadData> => {
      const preMountPromise = new Promise((resolve, reject) => {
        setPreload(first)
        if (first) {
          first.updateHeight = resolve
        }
      })
      return preMountPromise as Promise<PreloadData>
    }

    // 使用迭代器生成器执行异步函数
    async function* loopMount(array: CellRowDataType[]) {
      for (const item of array) {
        yield await proMountFirst(item);
      }
    }

    const iterator = loopMount(appendList);

    (async () => {
      for await (const result of iterator) {
        // 可以在这里处理每个异步函数的结果
        const { item, height } = result
        const h = height + list.length * preSetCellHeight;
        console.log(result);
        const node = generatorNode(item, list.length)
        setHeight(h);
        setList([...list, node])
      }
    })();


  }, [appends])





  return (
    <Fragment>
      <div
        ref={container}
        className={styles.container}
        style={{ height: `${height}px` }}
      >
        {list.map((a) => (
          <ContainerCell
            cellClassName={a.data.className}
            key={a.data.id}
            rowData={a}
          >
            {onRenderCell(a.data)}
          </ContainerCell>
        ))}
        <div className={styles.preload}>
          {preload && (
            <PreloadCells
              cellClassName={`${preload?.cellClassName} ${preload?.className}`}
              rowData={preload}
              key={preload.id}
              updateHeight={preload.updateHeight}
            >
              {onRenderCell(preload)}
            </PreloadCells>
          )}
        </div>
      </div>
      <div ref={button} id='end'></div>
    </Fragment>
  );
};

export default VirtualScroll;
