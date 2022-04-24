import React, {
  useRef,
  useState,
  useEffect,
  Fragment,
  useContext,
  createContext,
} from 'react';
import type { FC } from 'react';
import styles from './index.less';

const ContainerContext = createContext({
  height: 0,
  updateHeight: (d: any, v: number) => { },
});

type ContainerCellProps = {
  rowData: any;
  cellClassName?: string;
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

type PreloadCellProps = {
  rowData: any;
  cellClassName?: string;
};
const PreloadCell: FC<PreloadCellProps> = ({
  children,
  rowData,
  cellClassName = '',
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

type VirtualScrollProps = {
  initList?: any[],
  loadDate: () => Promise<any[] | undefined>;
  end: Boolean;
  onRenderCell: (data: any) => JSX.Element;
  preSetCellHeight?: number;
  getCellHeight?: (row: any, width?: number) => number;
  cellClassName?: string;
};

const VirtualScroll: FC<VirtualScrollProps> = ({
  loadDate,
  end,
  onRenderCell,
  preSetCellHeight = 50,
  cellClassName = '',
  getCellHeight
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const button = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  const [appends, setAppends] = useState<any[]>([]);
  const [visiableList, setVisiableList] = useState<any[]>([]);
  const [preload, setPreload] = useState<any>(undefined);
  const updateHeight = (d: any, h: any) => {
    const l = [...list];
    // 更新当前那一项的高度
    const index = l.findIndex((l) => l.data.id === d.id);
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
    initData();
  }, []);

  const initData = async () => {
    await queryDate();
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollDown);
    return () => {
      window.removeEventListener('scroll', scrollDown);
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
        pushItemWithHeight([...appends])
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
        filterVisiable();
      }, 20);
    } else {
      filterVisiable();
    }
  };

  const pushItemWithHeight = (appends: any[]) => {
    if (getCellHeight) {
      filterVisiable();
      if (appends?.length > 0 && container.current) {
        const first = appends.shift();
        console.dir(container)
        const containerW = container.current.clientWidth
        const height: number = getCellHeight(first.data, containerW);
        updateHeight(first.data, height);
        setTimeout(() => {
          if (appends && appends.length > 0) {
            setAppends([...appends]);
          }
          filterVisiable();
        }, 20);
      } else {
        filterVisiable();
      }
    }
  };

  const scrollDown = async () => {
    // 加载下一页数据
    if (!loading) {
      const endVisiable = ifEndVisiable()
      if (endVisiable) {
        setLoading(true);
        return;
      }
      filterVisiable();
    }
  };

  const ifEndVisiable = () => {
    const position: any = button.current?.getBoundingClientRect();
    return position.bottom < window.innerHeight
  }

  const queryDate = async () => {
    if (end) {
      return;
    }
    const data = await loadDate();
    setLoading(false);
    if (!data) {
      return;
    }
    const h = height + data.length * preSetCellHeight;
    setHeight(h);
    const appends = data.map((d) => ({ data: d, position: undefined }));
    setList([...list, ...appends]);
    setAppends(appends);
  };

  const filterVisiable = () => {
    const wH = window.innerHeight;
    const scrolled = window.scrollY;
    const offset = container.current?.offsetTop || 0;
    const l = [...list];
    // 将视图内的内容筛选出来
    const visiables = l.filter(
      (item) =>
        item.position &&
        !(
          item.position.bottom + offset < scrolled ||
          wH + scrolled < item.position.top
        ),
    );
    setVisiableList(visiables);
  };

  return (
    <Fragment>
      <ContainerContext.Provider value={{ height, updateHeight: updateHeight }}>
        <div
          ref={container}
          className={styles.container}
          style={{ height: `${height}px` }}
        >
          {visiableList.map((a) => (
            <ContainerCell
              cellClassName={cellClassName}
              key={a.data.id}
              rowData={a}
            >
              {onRenderCell(a.data)}
            </ContainerCell>
          ))}
          <div className={styles.preload}>
            {preload && (
              <PreloadCell cellClassName={cellClassName} rowData={preload}>
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
