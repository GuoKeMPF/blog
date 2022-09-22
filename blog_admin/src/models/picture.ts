import { queryPictures, addPicture, addPictures, deletePicture } from '@/services/picture';

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
      const response: { data: PicturesResponseType } = yield call(queryPictures, payload);

      if (response.data) {
        const { data = [], count: total = 0, size = 0, page = 1 } = response.data;
        yield put({
          type: 'update',
          payload: { pictures: data, total, size, page },
        });
      }
    },

    *addPicture({ payload }: any, { put, call }: any) {
      const response: { data: PicturesResponseType } = yield call(addPicture, payload);
      if (response.data) {
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
      }
    },

    *addPictures({ payload }: any, { put, call }: any) {
      const response: { data: PicturesResponseType } = yield call(addPictures, payload);
      if (response.data) {
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
      }
    },

    *deletePicture({ payload }: any, { put, call }: any) {
      const response: { data: PicturesResponseType } = yield call(deletePicture, payload);
      if (!response.data) {
        return;
      }
      const pictures: { data: { data: PictureStateType.PictureTypes } } = yield call(queryPictures);
      if (pictures.data) {
        yield put({
          type: 'update',
          payload: { pictures: pictures.data.data },
        });
      }
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
