import { Get, Post, Put, Delete } from './requset';
import { draft } from './api';
import type { DraftType } from 'umi';

export async function queryDrafts() {
  return Get(draft);
}

export async function queryDraft({ id }: { id: string }) {
  return Get(`${draft}/${id}`);
}

export async function addDraft(data: DraftType) {
  return Post(`${draft}/`, data);
}

export async function updateDraft(data: { id: string; data: DraftType }) {
  return Put(`${draft}/${data.id}`, data);
}

export async function deleteDraft({ id }: { id: string }) {
  return Delete(`${draft}/${id}`);
}
