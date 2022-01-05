import { queryTexts, queryText } from '@/services/text';
import { Effect, Reducer } from 'umi';

export interface TextsType {
  id: string;
  content: string;
  title: string;
  description: string;
  [propname: string]: any;
}

export interface InitTextStateType {
  texts: TextsType[];
  text: TextsType;
}

export interface ModelType {
  namespace: string;
  state: InitTextStateType;
  effects: {
    queryTexts: Effect;
    queryText: Effect;
  };
  reducers: {
    update: Reducer<InitTextStateType>;
  };
}
const initText = {
  id: '',
  content: '',
  title: '',
  ifPublic: false,
  description: '',
};

export const initState: InitTextStateType = {
  texts: [],
  text: initText,
};

const Text: ModelType = {
  namespace: 'texts',
  state: initState,
  effects: {
    *queryTexts(_action: any, { put, call }: any) {
      const response = yield call(queryTexts);
      if (response) {
        yield put({
          type: 'update',
          payload: { texts: response.data },
        });
      }
    },

    *queryText({ payload }: any, { put, call }: any) {
      const { id } = payload;
      const response = yield call(queryText, { id });
      if (response) {
        yield put({
          type: 'update',
          payload: { text: response },
        });
      }
    },
  },
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default Text;
