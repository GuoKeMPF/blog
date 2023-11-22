/** @format */

import React, {
	Fragment,
	createContext,
	useState,
	useEffect,
	useRef,
	useCallback,
} from "react";
import type { FC } from "react";
import type { NextPageWithLayout } from "../_app";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import Spin from "@/components/Spin";
import VirtualScroll from "@/components/VirtualScroll";
import { PictureContext } from "@/components/features/Picture";
import ImageContainer from "@/components/features/Picture/ImageContainer";
import ImageModal from "@/components/features/Picture/ImageModal";
import { queryPictures } from "@/services";
import { PicturesParams } from "@/services/API";

const gutter = 20;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	const res = await queryPictures({ ...query });
	return {
		props: {
			initialState: {
				size: res.size ?? 10,
				page: res.page ?? 1,
				loading: false,
				texts: res.data || [],
				total: res.count,
			},
		},
	};
};

const Picture: NextPageWithLayout = ({
	initialState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const page = useRef<number>(1);
	const [loading, setLoading] = useState(initialState.loading);

	const [visiable, setVisiable] = useState<boolean>(false);
	const [select, setSelect] = useState<any>(undefined);
	const [size, setSize] = useState(initialState.size);
	const [total, setTotal] = useState(initialState.total);

	const scrollContainer = useRef<any>();

	const getPictures = async (query: PicturesParams) => {
		setLoading(true);
		const response = await queryPictures({ ...query });
		setLoading(false);
		setSize(response.size);
		setTotal(response.count);
		return response.data;
	};

	const loadMore = useCallback(async () => {
		const nextPage = page.current + 1;
		const query = {
			size: size,
			page: nextPage,
		};
		page.current = nextPage;

		return await getPictures(query);
	}, [page]);

	return (
		<Spin loading={loading}>
			<PictureContext.Provider
				value={{ visiable, setVisiable, select, setSelect }}
			>
				<VirtualScroll
					ref={scrollContainer}
					loadMoreData={loadMore}
					hasNext={total > page.current * size}
					preSetCellHeight={60}
					initList={initialState.texts}
					// ! to do
					// 宽度应该根据容器设置的值算出来
					getCellHeight={(row) => {
						const containerW = scrollContainer.current.clientWidth;
						const imgaeW = row.width || 0;
						if (imgaeW > containerW) {
							return (row.height * containerW) / imgaeW + gutter;
						} else {
							return row.height + gutter;
						}
					}}
					onRenderCell={(data: any) => (
						<Fragment>
							<ImageContainer src={data.src} alt={data?.name} data={data} />
						</Fragment>
					)}
				/>
				<ImageModal />
			</PictureContext.Provider>
		</Spin>
	);
};

export default Picture;
