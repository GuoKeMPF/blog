/** @format */

import React, { Fragment, useState } from "react";

import type { NextPageWithLayout } from "../_app";

import Spin from "@/components/Spin";
import VirtualScroll from "@/components/VirtualScroll";
import { TextItem } from "@/components/Text";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { queryTexts } from "@/services";

import styles from "./index.module.scss";
import { initializeStore } from "@/store/store";
import { useText } from "@/store/stores";



export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	const res = await queryTexts({ ...query });
	const zustandStore = initializeStore({
		text: {
			size: res.size ?? 50,
			page: res.page ?? 1,
			loading: false,
			texts: res.data || [],
		},
	});

	return {
		props: {
			initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
		},
	};
};

const Home: NextPageWithLayout = ({ }: InferGetServerSidePropsType<
	typeof getServerSideProps
>) => {
	const { loading, texts, total } = useText();

	const loadMore = async () => {

		return []
	}


	return (
		// <></>
		<Spin loading={loading}>
			<div className={styles.container}>
				<VirtualScroll
					loadMoreDate={loadMore}
					initList={texts}
					end={total === texts.length}
					preSetCellHeight={60}
					cellClassName={(data) => {
						const { index } = data
						const otherClassName = index % 2 === 0 ? styles.odd : styles.even
						return `${styles.row} ${otherClassName}`
					}}
					onRenderCell={(data: any) => (
						<Fragment>
							<div className={styles.line}>
								<div className={styles.index}></div>
							</div>
							<div className={styles.texts}>
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
