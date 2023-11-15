/** @format */

import React, {
  useRef,
  useState,
  useEffect,
  Fragment,
  useCallback,
} from 'react';
import type { FC, ReactNode } from 'react';
import styles from './index.less';

type ContainerCellProps = {
  rowData: CellType;
  cellClassName?: string;
  children: ReactNode;
};
const ContainerCell: FC<ContainerCellProps> = ({
  children,
  rowData,
  cellClassName = '',
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
  updateHeight: ({
    item,
    height,
  }: {
    item: CellRowDataType;
    height: number;
  }) => void;
};
const PreloadCells: FC<PreloadCellsProps> = ({
  children,
  rowData,
  cellClassName = '',
  updateHeight,
}) => {
  const cell = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const preMount = () => {
      if (cell?.current) {
        updateHeight({
          item: rowData,
          height: cell.current.clientHeight,
        });
      }
    };
    preMount();
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
  height: number;
};

type PreloadData = CellRowDataType & {
  updateHeight?: (data: UpdateHeightParams) => void;
};

type CellRowDataType = {
  id: string | number;
  [key: string]: any;
};

type CellPosition = {
  top: number;
  bottom: number;
  height: number;
};
interface CellType {
  data: CellRowDataType;
  position?: CellPosition;
  index: number;
  className: string;
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
  cellClassName = '',
  getCellHeight,
  initList = [],
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const button = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // 容器高度做虚拟滚动
  const [height, setHeight] = useState<number>(0);
  // 加工过带位置高度的列表
  const [list, setList] = useState<CellType[]>([]);
  // 新加入的数据
  const [appends, setAppends] = useState<CellRowDataType[]>([...initList]);
  const [preload, setPreload] = useState<CellRowDataType | undefined>(
    undefined,
  );
  // 视口可以看到的高度
  const [visibleList, setVisibleList] = useState<CellType[]>([]);

  useEffect(() => {
    window.addEventListener('scroll', scrollDown);
    const intersectionObserver = new IntersectionObserver((entries) => {
      // 如果 intersectionRatio 为 0，则目标在视野外，
      // 我们不需要做任何事情。
      if (entries[0].intersectionRatio > 0) {
        loadNextData();
      }
    });
    if (button.current) {
      intersectionObserver.observe(button.current);
    }

    return () => {
      window.removeEventListener('scroll', scrollDown);
      intersectionObserver.disconnect();
    };
  }, []);

  const scrollDown = async () => {
    // 加载下一页数据
    if (!loading) {
      filterVisible();
    }
  };
  const loadNextData = useCallback(async () => {
    console.log('hasNext');

    if (!hasNext) {
      return;
    }
    const data = await loadMoreData();
    setLoading(false);
    if (!data) {
      return;
    }
    setAppends(data);
  }, [hasNext, loadMoreData]);

  useEffect(() => {
    filterVisible();
  }, [list]);

  useEffect(() => {
    const appendList = [...appends];
    const proMountFirst = (first: PreloadData): Promise<PreloadData> => {
      const preMountPromise = new Promise((resolve, reject) => {
        setPreload(first);
        if (first) {
          first.updateHeight = resolve;
        }
      });
      return preMountPromise as Promise<PreloadData>;
    };

    // 使用迭代器生成器执行异步函数
    async function* loopMount(array: CellRowDataType[]) {
      for (const item of array) {
        yield await proMountFirst(item);
      }
    }

    const iterator = loopMount(appendList);

    (async () => {
      let subHeight = 0,
        subList = [],
        initTop = list[list.length - 1]?.position?.bottom ?? 0;
      for await (const result of iterator) {
        // 可以在这里处理每个异步函数的结果
        const { item, height: itemHeight } = result;
        const node = generatorNode(item, list.length, initTop);
        // setHeight(h);
        // setList([...list, node]);
        subHeight += itemHeight - preSetCellHeight;
        initTop += itemHeight;
        subList.push(node);
      }
      setHeight(height + subHeight);
      setList([...list, ...subList]);
      setPreload(undefined);
    })();
  }, [appends]);

  const generatorNode = (
    item: CellRowDataType,
    length: number,
    preBottom: number = 0,
  ) => {
    let className: string = '';
    const node = {
      data: item,
      index: length,
    };
    if (typeof cellClassName === 'function') {
      className = cellClassName(node);
    } else {
      className = cellClassName;
    }
    return {
      ...node,
      className,
      position: {
        height: item.height,
        top: preBottom,
        bottom: preBottom + item.height,
      },
    };
  };

  const filterVisible = () => {
    const wH = window.innerHeight;
    const scrolled = window.scrollY;
    const offset = container.current?.offsetTop || 0;
    const l = [...list];
    // 将视图内的内容筛选出来
    const visibleList = l.filter(
      (item) =>
        item.position &&
        !(
          item.position.bottom + offset < scrolled ||
          wH + scrolled < item.position.top
        ),
    );
    console.log(visibleList);

    setVisibleList(visibleList);
  };

  return (
    <Fragment>
      <div
        ref={container}
        className={styles.container}
        style={{ height: `${height}px` }}
      >
        {visibleList.map((a) => (
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
      <div ref={button} id="end"></div>
    </Fragment>
  );
};

export default VirtualScroll;
