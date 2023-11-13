/** @format */

export interface PageResponseParams<T = {}> extends T {
	size?: string | number;
	page?: string | number;
}

export type PageResponse<T> = {
	count: number;
	page: number;
	size: number;
	data: T[];
};

export interface PageParams {
	page?: number;
	size?: number;
}

export type Text = {
	author: string;
	id: string;
	content: string;
	title: string;
	description: string;
};

export type ID = number | string;

export interface TextParams extends PageParams {}
