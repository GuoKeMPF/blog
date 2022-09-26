import { Get, Post, Delete } from './requset';
import { picture, pictures } from './api';

export async function queryPictures(params: any) {
  return Get(`${picture}/`, { size: 12, page: 1, ...params });
}

export async function addPicture(data: FormData) {
  return Post(`${picture}/`, data);
}
export async function addPictures(data: FormData) {
  return Post(`${pictures}/`, data);
}

export async function deletePicture({ id }: { id: string }) {
  return Delete(`${picture}/${id}/`);
}
