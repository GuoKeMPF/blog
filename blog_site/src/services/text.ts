/** @format */

import request from "@/utils/requset";
import { text } from "./urls";
import { PageResponseParams, PageResponse, Text, ID } from "./API";
export async function queryTexts(
	params?: PageResponseParams
): Promise<PageResponse<Text>> {
	return request(text, { params });
}

export async function queryText(id: ID): Promise<Text> {
	return request(`${text}/${id}`);
}
