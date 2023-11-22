import { request } from 'umi';

export const loadMore = async (params: { size: number; number: number }) => {
  const res = request('/api/list', { params });
  return res;
};
