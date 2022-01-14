import { Get, Post, Delete } from './requset';
import { picture } from './api';

export async function queryPictures() {
  return Get(picture);
}

export async function addPicture(data: FormData) {
  return Post(`${picture}/`, data);
}

export async function deletePicture({ id }: { id: string }) {
  return Delete(`${picture}/${id}`);
}
