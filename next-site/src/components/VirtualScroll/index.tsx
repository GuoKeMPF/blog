import React, {
  useRef,
  useState,
  useEffect,
  Fragment,
  useContext,
  createContext,
} from "react";
import type { FC, ReactNode } from "react";
import styles from "./index.module.scss";

const ContainerContext = createContext({
  height: 0,
  updateHeight: (d: any, v: number) => { },
});

type ContainerCellProps = {
  rowData: any;
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

type PreloadCellProps = {
  rowData: any;
  cellClassName?: string;
  children: ReactNode;
};
const PreloadCell: FC<PreloadCellProps> = ({
  children,
  rowData,
  cellClassName = "",
}) => {
  const cell = useRef<HTMLDivElement | null>(null);
  const context = useContext(ContainerContext);
  const { updateHeight } = context;
  useEffect(() => {
    if (cell?.current) {
      updateHeight(rowData.data, cell.current.clientHeight);
    }
  }, [rowData.data]);
  return (
    <div
      ref={cell}
      className={`${styles.cell} ${cellClassName}`}
      style={{
        top: `${rowData?.position?.top}px`,
      }}
    >
      {children}
    </div>
  );
};

type CellRowDataType = {
  id: string | number
  [key: string]: any
}


type CellPosition = DOMRect | undefined
interface CellType {
  data: CellRowDataType,
  position: CellPosition
}

interface CellClassNameParams {
  data: CellRowDataType,
  index: number
}

type VirtualScrollProps = {
  initList?: CellRowDataType[];
  loadMoreDate: () => Promise<CellRowDataType[] | undefined>;
  end: Boolean;
  onRenderCell: (data: CellRowDataType) => JSX.Element;
  preSetCellHeight?: number;
  getCellHeight?: (row: CellRowDataType, width?: number) => number;
  cellClassName?: string | ((callData: CellClassNameParams) => string);
};

const VirtualScroll: FC<VirtualScrollProps> = ({
  loadMoreDate,
  end,
  onRenderCell,
  preSetCellHeight = 50,
  cellClassName = "",
  getCellHeight,
  initList = [],
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const button = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<(CellType | CellRowDataType)[]>(initList);
  const [appends, setAppends] = useState<any[]>([]);
  const [visibleList, setVisibleList] = useState<any[]>([]);
  const [preload, setPreload] = useState<any>(undefined);
  const updateHeight = (d: any, h: any) => {
    const l = [...list];
    // 更新当前那一项的高度
    const index = l.findIndex((l) => l?.data.id === d.id);
    if (index >= 0) {
      const pre = l[index - 1];
      const item = l[index];
      item.position = {
        ...item.position,
        height: h,
        top: pre?.position?.bottom || 0,
        bottom: (pre?.position?.bottom || 0) + h,
      };
      l[index] = item;
      setList([...l]);
    }
    // 修正子项和预设高度之间的误差
    setHeight(height + h - preSetCellHeight);
  };
  useEffect(() => {
    initData()
    window.addEventListener("scroll", scrollDown);
    return () => {
      window.removeEventListener("scroll", scrollDown);
    };
  }, []);

  const initData = () => {
    if (list.length > 0) {

      const h = height + list.length * preSetCellHeight;
      setHeight(h);
      const appends = getAppends(list, list.length);
      setList([...appends]);
      setAppends(appends);
    }
  };

  const getAppends = (appends: any[], preListLength: number) => {
    return appends.map((d, index) => {
      let className: string = ''
      const node = {
        data: d, index: preListLength + index
      }
      if (typeof cellClassName === 'function') {
        className = cellClassName(node)
      } else {
        className = cellClassName
      }
      return { ...node, className, position: undefined }
    });
  }



  useEffect(() => {
    window.addEventListener("scroll", scrollDown);
    return () => {
      window.removeEventListener("scroll", scrollDown);
    };
  }, [list]);

  useEffect(() => {
    if (loading) {
      queryDate();
    }
  }, [loading]);

  useEffect(() => {
    if (appends?.length > 0) {
      // 如果有预设的获取高度的方法则直接更新高度
      // 否则挂载一次子元素更新高度
      if (getCellHeight) {
        pushItemWithHeight([...appends]);
      } else {
        pushItem([...appends]);
      }
    }
  }, [appends]);

  const pushItem = (appends: any[]) => {
    if (appends?.length > 0) {
      const first = appends.shift();
      setPreload(first);
      setTimeout(() => {
        if (appends && appends.length > 0) {
          setAppends([...appends]);
        }
        filterVisible();
      }, 20);
    } else {
      filterVisible();
    }
  };

  const pushItemWithHeight = (appends: any[]) => {
    if (getCellHeight) {
      filterVisible();
      if (appends?.length > 0 && container.current) {
        const first = appends.shift();
        const containerW = container.current.clientWidth;
        const height: number = getCellHeight(first.data, containerW);
        updateHeight(first.data, height);
        setTimeout(() => {
          if (appends && appends.length > 0) {
            setAppends([...appends]);
          }
          filterVisible();
        }, 20);
      } else {
        filterVisible();
      }
    }
  };

  const scrollDown = async () => {
    // 加载下一页数据
    if (!loading) {
      const endVisible = ifEndVisible();
      if (endVisible) {
        setLoading(true);
        return;
      }
      filterVisible();
    }
  };

  const ifEndVisible = () => {
    const position: CellPosition = button.current?.getBoundingClientRect();
    return (position?.bottom || 0) < window.innerHeight;
  };

  const queryDate = async () => {
    if (end) {
      return;
    }
    const data = await loadMoreDate();
    setLoading(false);
    if (!data) {
      return;
    }
    const h = height + data.length * preSetCellHeight;
    setHeight(h);
    const appends = getAppends(data, list.length)
    setList([...list, ...appends]);
    setAppends(appends);
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
        )
    );
    setVisibleList(visibleList);
  };

  return (
    <Fragment>
      <ContainerContext.Provider value={{ height, updateHeight: updateHeight }}>
        <div
          ref={container}
          className={styles.container}
          style={{ height: `${height}px` }}
        >
          {visibleList.map((a) => (
            <ContainerCell
              cellClassName={a.className}
              key={a.data.id}
              rowData={a}
            >
              {onRenderCell(a.data)}
            </ContainerCell>
          ))}
          <div className={styles.preload}>
            {preload && (
              <PreloadCell cellClassName={preload.cellClassName} rowData={preload}>
                {onRenderCell(preload.data)}
              </PreloadCell>
            )}
          </div>
        </div>
        <div ref={button} id="end"></div>
      </ContainerContext.Provider>
    </Fragment>
  );
};

export default VirtualScroll;
