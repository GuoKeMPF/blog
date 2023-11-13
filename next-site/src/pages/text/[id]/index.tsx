/** @format */

import React, { FC, Fragment, useEffect, useState, useMemo } from "react";
import Spin from "@/components/Spin";
import Breadcrumb from "@/components/Breadcrumb";
import Content from "@/components/features/Text/Content";

import { urls } from "@/utils/urls";

import { Text } from "@/services/API";
import { GetServerSideProps } from "next/types";
import { queryText } from "@/services";

interface TextDetailProps {
	text: Text;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { params } = context;
	const id = params?.id as string;
	const res = await queryText(id);
	return {
		props: {
			text: res || {},
		},
	};
};

const TextDetail: FC<TextDetailProps> = ({ text }) => {
	const [loading, setLoading] = useState<boolean>(false);

	const breadcrumb = useMemo(
		() => ({
			title: urls.index.title,
			path: urls.index.path,
			children: {
				title: urls.text.title,
				path: urls.text.path,
				children: {
					title: `${text.title || ""}`,
				},
			},
		}),
		[text.title]
	);

	return (
		<div id='text'>
			<Breadcrumb routers={breadcrumb} />
			<Spin loading={loading}>
				<Content {...text} />
			</Spin>
		</div>
	);
};

export default TextDetail;
