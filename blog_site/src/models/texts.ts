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
  total: number | undefined;
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
    reset: Reducer<InitTextStateType>;
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
  total: undefined,
  text: initText,
};

const Text: ModelType = {
  namespace: 'texts',
  state: initState,
  effects: {
    *queryTexts({ payload }: any, { put, call, select }: any) {
      const response = yield call(queryTexts, payload);
      const pretexts = yield select((store: any) => store.texts.texts);
      if (response) {
        yield put({
          type: 'update',
          payload: {
            texts: [...pretexts, response.data],
            total: response.count,
          },
        });
        return response.data;
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
    reset() {
      return {
        texts: [],
        total: undefined,
        text: initText,
      };
    },
  },
};
export default Text;
