import { successSet } from '@/utils/enum';

export const ifResponseSuccess: (response: { status: number }) => boolean = (response) => {
  const { status } = response;
  console.log(status);
  console.log('successSet.has(status)', successSet.has(status));
  return successSet.has(status);
};
