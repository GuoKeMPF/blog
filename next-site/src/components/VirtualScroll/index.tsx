/** @format */

import React, {
	useRef,
	useState,
	useEffect,
	Fragment,
	useCallback,
	ForwardRefRenderFunction,
	useImperativeHandle,
} from "react";
import type { FC, ForwardedRef, ReactNode } from "react";
import styles from "./index.module.scss";

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
	cellClassName = "",
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
	getCellHeight?: (row: CellRowDataType) => number;

	preSetCellHeight?: number;
	cellClassName?: string | ((callData: CellClassNameParams) => string);
};

const VirtualScroll: ForwardRefRenderFunction<
	ForwardedRef<HTMLDivElement | null>,
	VirtualScrollProps
> = (
	{
		loadMoreData,
		hasNext,
		onRenderCell,
		cellClassName = "",
		getCellHeight,
		initList = [],
		preSetCellHeight = 100,
	},
	ref
) => {
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
		undefined
	);
	// 视口可以看到的高度
	const [visibleList, setVisibleList] = useState<CellType[]>([]);
	useImperativeHandle(
		ref,
		() => {
			return { underlyingDiv: container.current };
		},
		[]
	);

	useEffect(() => {
		window.addEventListener("scroll", scrollDown);
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
			window.removeEventListener("scroll", scrollDown);
			intersectionObserver.disconnect();
		};
	}, []);

	const filterVisible = useCallback(() => {
		const wH = window.innerHeight;
		const scrolled = window.scrollY;
		const offset = container.current?.offsetTop || 0;
		const l = [...list];
		// 将视图内的内容筛选出来

		const visibleList = l.filter((item) => {
			return (
				item.position &&
				!(
					item.position.bottom + offset < scrolled ||
					wH + scrolled < item.position.top
				)
			);
		});

		setVisibleList(visibleList);
	}, [list]);

	const scrollDown = useCallback(async () => {
		// 加载下一页数据
		if (!loading) {
			filterVisible();
		}
	}, [filterVisible]);

	const loadNextData = useCallback(async () => {
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
		window.addEventListener("scroll", scrollDown);
		filterVisible();
		return () => {
			window.removeEventListener("scroll", scrollDown);
		};
	}, [list]);

	useEffect(() => {
		if (appends?.length > 0) {
			// 如果有预设的获取高度的方法则直接更新高度
			// 否则挂载一次子元素更新高度
			if (getCellHeight) {
				pushItemWithHeight();
			} else {
				pushItemWithMount();
			}
		}
	}, [appends]);

	const pushItemWithHeight = () => {
		const appendList = [...appends];
		let subHeight = 0,
			subList: CellType[] = [],
			initTop = list[list.length - 1]?.position?.bottom || 0;
		appendList.forEach((item, index) => {
			// 可以在这里处理每个异步函数的结果
			const itemHeight = getCellHeight ? getCellHeight(item) : preSetCellHeight;
			const node = generatorNode(item, list.length, itemHeight, index, initTop);
			subHeight += itemHeight;
			initTop += itemHeight;
			subList.push(node);
			index++;
		});
		setHeight(height + subHeight);
		setList([...list, ...subList]);
	};

	const pushItemWithMount = () => {
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
				initTop = list[list.length - 1]?.position?.bottom ?? 0,
				index = 0;

			for await (const result of iterator) {
				// 可以在这里处理每个异步函数的结果
				const { item, height: itemHeight } = result;
				const node = generatorNode(
					item,
					list.length,
					itemHeight,
					index,
					initTop
				);
				subHeight += itemHeight;
				initTop += itemHeight;
				subList.push(node);
				index++;
			}

			setHeight(height + subHeight);
			setList([...list, ...subList]);
			setPreload(undefined);
		})();
	};

	const generatorNode = (
		item: CellRowDataType,
		length: number,
		height: number = 0,
		index: number,
		preBottom: number = 0
	) => {
		let className: string = "";
		const node = {
			data: item,
			index: length + index,
		};
		if (typeof cellClassName === "function") {
			className = cellClassName(node);
		} else {
			className = cellClassName;
		}
		return {
			...node,
			className,
			position: {
				height: height,
				top: preBottom,
				bottom: preBottom + height,
			},
		};
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
						cellClassName={a.className}
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
