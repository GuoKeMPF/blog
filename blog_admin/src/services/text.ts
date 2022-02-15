import { Get, Post, Put, Delete } from './requset';
import { text } from './api';
import type { TextType } from 'umi';

export async function queryTexts(params: any) {
  return Get(text, { size: 12, page: 1, ...params });
}

export async function queryText({ id }: { id: string }) {
  return Get(`${text}/${id}`);
}

export async function addText(data: TextType) {
  return Post(`${text}/`, data);
}

export async function updateText(data: { id: string; data: TextType }) {
  return Put(`${text}/${data.id}`, data);
}

export async function deleteText({ id }: { id: string }) {
  return Delete(`${text}/${id}`);
}
