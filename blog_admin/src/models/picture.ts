import { queryPictures, addPicture, addPictures, deletePicture } from '@/services/picture';

import { ifResponseSuccess } from '@/utils/ifResponseSuccess';
import type { ResponseType } from '@/utils/ifResponseSuccess';

export namespace PictureStateType {
  export type PictureType = {
    id: string;
    src: string;
    create_time?: string;
    name: string;
  };
  export type PictureTypes = PictureType[];
}

export interface PicturesResponseType {
  data: PictureStateType.PictureType[];
  count: number;
  size: number;
  page: number;
}
export interface PictureStateType {
  pictures: PictureStateType.PictureTypes;
  visiable: boolean;
  total: number;
  size: number;
  page: number;
}

const initState: PictureStateType = {
  pictures: [],
  visiable: false,
  total: 0,
  size: 0,
  page: 0,
};

const Picture = {
  namespace: 'picture',
  state: initState,
  effects: {
    *queryPictures({ payload }: any, { put, call }: any) {
      const response: ResponseType = yield call(queryPictures, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      const { body } = response;
      if (body) {
        const { data = [], count: total = 0, size = 0, page = 1 } = body;
        yield put({
          type: 'update',
          payload: { pictures: data, total, size, page },
        });
      }
    },

    *addPicture({ payload }: any, { put, call }: any) {
      const response: ResponseType = yield call(addPicture, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      yield put({
        type: 'queryPictures',
        payload: {},
      });
      yield put({
        type: 'setVisiable',
        payload: {
          visiable: false,
        },
      });
    },

    *addPictures({ payload }: any, { put, call }: any) {
      const response: ResponseType = yield call(addPictures, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      yield put({
        type: 'queryPictures',
        payload,
      });
      yield put({
        type: 'setVisiable',
        payload: {
          visiable: false,
        },
      });
    },

    *deletePicture({ payload }: any, { put, call }: any) {
      const response: ResponseType = yield call(deletePicture, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      const pictures: ResponseType = yield call(queryPictures);
      if (!ifResponseSuccess(response)) {
        return;
      }
      const { body } = pictures;
      const { data = [], count: total = 0, size = 0, page = 1 } = body;
      yield put({
        type: 'update',
        payload: { pictures: data, total, size, page },
      });
    },
  },
  reducers: {
    update(state: PictureStateType, action: { payload: any }) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setVisiable(state: PictureStateType, action: { payload: { visiable: boolean } }) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
export default Picture;
