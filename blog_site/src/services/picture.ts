import request from '@/utils/requset';
import { picture } from './urls';

export async function queryPictures() {
  return request(picture);
}

export async function queryPictureByID({ id }: { id: string }) {
  return request(`${picture}${id}`);
}
