import { Get, Post, Delete } from './requset';
import { picture, uploads } from './api';

export async function queryPictures() {
  return Get(picture);
}

export async function addPicture(data: FormData) {
  return Post(`${uploads}/`, data);
}

export async function deletePicture({ id }: { id: string }) {
  return Delete(`${picture}/${id}`);
}
