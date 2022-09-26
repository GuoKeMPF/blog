import { successSet } from '@/utils/enum';

export interface ResponseType {
  status: number;
  body: any;
}

export const ifResponseSuccess: (response: { status: number }) => boolean = (response) => {
  const { status } = response;
  return successSet.has(status);
};
