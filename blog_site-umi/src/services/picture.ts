import request from '@/utils/requset';
import { picture } from './urls';

export async function queryPictures(params: any) {
  return request(picture, {
    params
  });
}

export async function queryPictureByID({ id }: { id: string }) {
  return request(`${picture}${id}`);
}
