/** @format */

import request from "@/utils/requset";
import { picture } from "./urls";
import { ID, PageResponse, PicturesParams, Picture } from "./API";

export async function queryPictures(
	params: PicturesParams
): Promise<PageResponse<Picture>> {
	return request(picture, {
		params,
	});
}

export async function queryPictureByID(id: ID): Promise<Picture> {
	return request(`${picture}${id}`);
}
