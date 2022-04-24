import { queryPictures, queryPictureByID } from '@/services/picture';
import { Effect, Reducer } from 'umi';
export namespace PictureStateType {
  export type PictureType = {
    id: string;
    src: string;
    create_time?: string;
    name: string;
    width: number,
    height: number
  };
  export type PictureTypes = PictureType[];
}



export interface PictureStateType {
  pictures: PictureStateType.PictureTypes;
  picture: PictureStateType.PictureType | undefined;
  total: number | undefined;
}

export interface ModelType {
  namespace: string;
  state: PictureStateType;
  effects: {
    queryPictures: Effect;
    queryPictureByID: Effect;
  };
  reducers: {
    update: Reducer<PictureStateType>;
    reset: Reducer<PictureStateType>;
  };
}
const initState: PictureStateType = {
  pictures: [],
  picture: undefined,
  total: undefined,
};

const Picture: ModelType = {
  namespace: 'picture',
  state: initState,
  effects: {
    *queryPictures({ payload }, { put, call, select }) {
      const response: { data: PictureStateType.PictureTypes; count: number } =
        yield call(queryPictures, payload);
      if (response) {
        const prepicture = yield select((store: any) => store.picture.pictures);
        yield put({
          type: 'update',
          payload: { pictures: [...prepicture, ...response.data], total: response.count },
        });
        return response.data;
      }
    },
    *queryPictureByID({ payload }, { put, call }) {
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
    update(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    reset() {
      return initState;
    }
  },
};
export default Picture;
