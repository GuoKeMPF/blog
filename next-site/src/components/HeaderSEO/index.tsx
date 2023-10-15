/** @format */

import React from "react";
import Head from "next/head";

import { defaultConfig } from "@/utils/seo";

import type { HeaderSEOProps } from "@/utils/seo";

export function HeaderSEO({ title = defaultConfig.title }: HeaderSEOProps) {
	return (
		<Head>
			<title>{title}</title>
		</Head>
	);
}

export default HeaderSEO;
