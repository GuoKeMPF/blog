/** @format */

import request from "@/utils/requset";
import { audio } from "./urls";

import { ID, PageResponse, AudioType, AudioParams } from "./API";

export async function queryAudios(
	params?: AudioParams
): Promise<PageResponse<AudioType>> {
	return request(audio, {
		params,
	});
}

export async function queryAudioByID(id: ID): Promise<AudioType> {
	return request(`${audio}/${id}`);
}
