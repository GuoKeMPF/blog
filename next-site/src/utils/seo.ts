/** @format */
export type HeaderSEOProps = {
	title: string;
};

export const defaultConfig: HeaderSEOProps = {
	title: "那个老麻啊",
};

export const home: HeaderSEOProps = { ...defaultConfig, title: "首页" };
