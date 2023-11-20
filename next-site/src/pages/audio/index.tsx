/** @format */

import React, { useState, useEffect } from "react";
import type { FC } from "react";

import Visualization from "@/components/features/Audio/Visualization";
import Spin from "@/components/Spin";
import { AudioType } from "@/services/API";
import { queryAudios } from "@/services";

import type { NextPageWithLayout } from "../_app";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	const res = await queryAudios({ ...query });
	return {
		props: {
			initialState: {
				size: res.size ?? 50,
				page: res.page ?? 1,
				loading: false,
				audios: res.data || [],
				total: res.count,
			},
		},
	};
};

interface PageProps {}
const Audio: NextPageWithLayout<PageProps> = ({
	initialState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [audios, setAudios] = useState<AudioType[]>(initialState.audios ?? []);
	const [audio, setAudio] = useState<AudioType>(() => {
		console.log(initialState.audios);

		return initialState.audios && initialState.audios[0];
	});
	const [loading, setLoading] = useState<boolean>(initialState.loading);

	// const init = async () => {
	// 	setLoading(true);
	// 	const { data = [] } = await queryAudios({});
	// 	if (data.length) {
	// 		setAudios(data);
	// 		setAudio(data[0]);
	// 	}
	// 	setLoading(false);
	// };

	const swithcAudio = (step: number) => {
		const index = audios.findIndex((a) => a.id === audio?.id);
		let nextIndex = index + step;
		if (index === audios.length - 1) {
			nextIndex = 0;
		}
		if (index < 0) {
			nextIndex = audios.length - 1;
		}
		const nextAudio = audios[nextIndex];
		setAudio(nextAudio);
	};

	return (
		<Spin loading={loading}>
			{audio && <Visualization swithcAudio={swithcAudio} config={audio} />}
		</Spin>
	);
};

export default Audio;
