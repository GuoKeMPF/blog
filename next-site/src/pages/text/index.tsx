/** @format */

import React, { Fragment, useState } from "react";

import type { NextPageWithLayout } from "../_app";

import Spin from "@/components/Spin";
import VirtualScroll from "@/components/VirtualScroll";
import { TextItem } from "@/components/features/Text";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { queryTexts } from "@/services";

import styles from "./index.module.scss";
import { TextParams } from "@/services/API";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	const res = await queryTexts({ ...query });
	return {
		props: {
			initialState: {
				size: res.size ?? 50,
				page: res.page ?? 1,
				loading: false,
				texts: res.data || [],
				total: res.count
			},
		},
	};
};

const Home: NextPageWithLayout = ({
	initialState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [loading, setLoading] = useState(initialState.loading);
	const [texts, setTexts] = useState(initialState.texts);
	const [total, setTotal] = useState(initialState.total);
	const [page, setPage] = useState(initialState.page);
	const [size, setSize] = useState(initialState.size);

	const getTexts = async (query: TextParams) => {
		setLoading(true);
		const response = await queryTexts({ ...query });
		setLoading(false);
		setPage(response.page);
		setSize(response.size);
		setTotal(response.count);
		return response.data;
	};

	const loadMore = async () => {
		const query = {
			size: size,
			page: page + 1,
		};
		console.log('loadMore');

		return await getTexts(query);
	};

	const loadPre = async () => {
		if (page <= 1) {
			return [];
		}
		const query = {
			size: size,
			page: page - 1,
		};
		return await getTexts(query);
	};

	return (
		<Spin loading={loading}>
			<div className={styles.container} id='texts'>
				<VirtualScroll
					loadMoreData={loadMore}
					initList={texts}
					hasNext={total > texts.length}
					preSetCellHeight={60}
					cellClassName={(data) => {
						const { index } = data;
						const otherClassName = index % 2 === 0 ? styles.odd : styles.even;
						return `${styles.row} ${otherClassName}`;
					}}
					onRenderCell={(data: any) => (
						<Fragment>
							<div className={styles.line}>
								<div className={styles.index}></div>
							</div>
							<div
								id={`text_summary_${data.id}`}
								className={`${styles.texts || ""} text_summary`}
							>
								<TextItem text={data} />
							</div>
						</Fragment>
					)}
				/>
			</div>
		</Spin>
	);
};

export default Home;
