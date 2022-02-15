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
}

const initState: PictureStateType = {
  pictures: [],
  picture: undefined,
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
    *queryPictureByID({payload}:{payload:{id:string}}, { put, call }: any) {
      const response: { data: PictureStateType.PictureTypes } = yield call(queryPictureByID, payload);
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
