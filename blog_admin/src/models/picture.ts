import { queryPictures, addPicture, deletePicture } from '@/services/picture';
import { message } from 'antd';


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
  count: number,
  size: number,
  page: number,
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
      const response: PicturesResponseType = yield call(queryPictures, payload);
      const { data = [], count: total = 0, size = 0, page = 1 } = response;
      if (response) {
        yield put({
          type: 'update',
          payload: { pictures: data, total, size, page },
        });
      }
    },

    *addPicture({ payload }: any, { put, call }: any) {
      const response: ResponseDateType = yield call(addPicture, payload);
      if (!response.code) {
        message.error(response.message);
        return;
      }
      if (response && response?.code) {
        const texts: { data: PictureStateType.PictureTypes } = yield call(queryPictures);
        if (texts) {
          yield put({
            type: 'update',
            payload: { pictures: texts.data },
          });
        }
      }
    },

    *deletePicture({ payload }: any, { put, call }: any) {
      const response: ResponseDateType = yield call(deletePicture, payload);
      if (!response.code) {
        message.error(response.message);
        return;
      }
      const pictures: { data: PictureStateType.PictureTypes } = yield call(queryPictures);
      if (pictures) {
        yield put({
          type: 'update',
          payload: { pictures: pictures.data },
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
