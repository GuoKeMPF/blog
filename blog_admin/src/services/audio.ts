import { Get, Post, Delete } from './requset';
import { audio, audios } from './api';

export async function queryAudios(params: any) {
  return Get(`${audio}/`, {
    params,
  });
}

export async function queryAudioByID({ id }: { id: string }) {
  return Get(`${audio}/${id}`);
}

export async function addAudio(data: FormData) {
  return Post(`${audio}/`, data);
}
export async function addAudios(data: FormData) {
  return Post(`${audios}/`, data);
}

export async function deleteAudio({ id }: { id: string }) {
  return Delete(`${audio}/${id}/`);
}
