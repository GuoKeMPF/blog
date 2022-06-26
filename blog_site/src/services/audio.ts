import request from '@/utils/requset';
import { audio } from './urls';

export async function queryAudios(params: any) {
  return request(audio, {
    params,
  });
}

export async function queryAudioByID({ id }: { id: string }) {
  return request(`${audio}${id}`);
}
