import request from '@/utils/requset';
import { text } from './urls';
export async function queryTexts() {
  return request(text);
}

export async function queryText({ id }: { id: string }) {
  return request(`${text}${id}`);
}
