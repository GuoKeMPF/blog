import { queryPictures, queryPictureByID } from '@/services/picture';

export namespace PictureStateType {
  export type PictureType = {
    id: string;
    src: string;
    create_time?: string;
    name: string;
  };
  export type PictureTypes = PictureType[];
}

export interface PictureStateType {
  pictures: PictureStateType.PictureTypes;
  picture: PictureStateType.PictureType | undefined;
  total: number | undefined;
}

const initState: PictureStateType = {
  pictures: [],
  picture: undefined,
  total: null,
};

const Picture = {
  namespace: 'picture',
  state: initState,
  effects: {
    *queryPictures(_action: any, { put, call }: any) {
      const response: { data: PictureStateType.PictureTypes; count: number } =
        yield call(queryPictures);
      if (response) {
        yield put({
          type: 'update',
          payload: { pictures: response.data, total: response.count },
        });
        return response.data;
      }
    },
    *queryPictureByID(
      { payload }: { payload: { id: string } },
      { put, call }: any,
    ) {
      const response: { data: PictureStateType.PictureTypes } = yield call(
        queryPictureByID,
        payload,
      );
      if (response) {
        yield put({
          type: 'update',
          payload: { picture: response.data },
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
