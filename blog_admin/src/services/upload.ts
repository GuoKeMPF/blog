import { picture } from './api';
import { Upload } from './requset';

export const uploadImage = async (
  blobInfo: { blob: () => any },
  succFun: (arg0: any) => void,
  failFun: (arg0: string) => void,
) => {
  const file = blobInfo.blob(); // 转化为易于理解的file对象
  const formData = new FormData();
  formData.append('file', file);
  const res = await Upload(`${picture}/`, formData);
  if (!res) {
    failFun(`Invalid JSON: ${res.responseText}`);
    return;
  }
  succFun(res.data.src);
};
