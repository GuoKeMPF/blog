import { upload } from './api';
import { Upload } from './requset';
import { prefix } from '@/utils/prefix';

export const uploadImage = async (
  blobInfo: { blob: () => any },
  succFun: (arg0: any) => void,
  failFun: (arg0: string) => void,
) => {
  const file = blobInfo.blob(); // 转化为易于理解的file对象
  const formData = new FormData();
  formData.append('file', file, file.name);
  const res = await Upload(`${upload}/`, formData);
  console.log(res);
  if (!res || typeof res.data !== 'string') {
    failFun(`Invalid JSON: ${res.responseText}`);
    return;
  }
  console.log(`${prefix}${res.data}`);
  succFun(`${prefix}${res.data}`);
};
