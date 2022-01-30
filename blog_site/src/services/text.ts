import request from '@/utils/requset';
import { text } from './urls';
export async function queryTexts(params: {
  size: string | number;
  page: string | number;
}) {
  return request(text, { params });
}

export async function queryText({ id }: { id: string }) {
  return request(`${text}${id}`);
}
