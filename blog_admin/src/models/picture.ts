import { queryPictures, addPicture, deletePicture } from '@/services/picture';

// export interface PictureType {
//   id: string;
//   src: string;
//   create_time: string;
// }

export namespace PictureStateType {
  export type PictureType = {
    id: string;
    src: string;
    create_time?: string;
  };
  export type PictureTypes = PictureType[];
}

export interface PictureStateType {
  pictures: PictureStateType.PictureTypes;
}

const initState: PictureStateType = {
  pictures: [],
};

const Picture = {
  namespace: 'picture',
  state: initState,
  effects: {
    *queryPictures(_action: any, { put, call }: any) {
      const response: { data: PictureStateType.PictureTypes } = yield call(queryPictures);
      if (response) {
        yield put({
          type: 'update',
          payload: { pictures: response.data },
        });
      }
    },

    *addPicture({ payload }: any, { put, call }: any) {
      const response: PictureStateType.PictureType = yield call(addPicture, payload);
      if (response) {
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
      yield call(deletePicture, payload);
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
  },
};
export default Picture;
