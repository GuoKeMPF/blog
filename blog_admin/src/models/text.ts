import { queryTexts, queryText, addText, updateText, deleteText } from '@/services/text';

import { formType } from '@/utils/enum';

export interface TextType {
  id: string;
  content: string;
  title: string;
  description: string;
  type?: string;
  visable?: boolean;
  [key: string]: any;
}

export namespace TextsStateType {
  export type Text = {
    id: string;
    content: string;
    title: string;
    description: string;
    [propname: string]: any;
  };
  export type Texts = TextType[];
}


export interface TextsResponseType {
  data: TextType[];
  count: number,
  size: number,
  page: number,
}

export interface TextStateType {
  texts: TextsStateType.Texts;
  text: TextsStateType.Text;
  total: number,
  size: number,
  page: number,
}

const initText = {
  id: '',
  content: '',
  title: '',
  description: '',
  type: formType.create,
  visable: false,
};

const initState: TextStateType = {
  texts: [],
  text: initText,
  total: 0,
  size: 0,
  page: 0,
};

const Text = {
  namespace: 'text',
  state: initState,
  effects: {
    *queryTexts({ payload }: any, { put, call }: any) {
      const response: TextsResponseType = yield call(queryTexts, payload);
      if (response) {
        const { data = [], count: total = 0, size = 0, page = 1 } = response;
        yield put({
          type: 'update',
          payload: { texts: data, total, size, page },
        });
      }
    },

    *queryText({ payload }: any, { put, call }: any) {
      const { id, ...other } = payload;
      const response: TextType = yield call(queryText, { id });
      if (response) {
        yield put({
          type: 'update',
          payload: { text: response, ...other },
        });
      }
    },

    *toEdit({ payload }: any, { put, call }: any) {
      const { type = formType.create } = payload;
      if (type === formType.create) {
        yield put({
          type: 'update',
          payload: { text: { ...initText, type, visable: true } },
        });
      } else {
        const { id } = payload;
        const response: TextType = yield call(queryText, { id });
        if (response) {
          yield put({
            type: 'update',
            payload: { text: { ...response, type, visable: true } },
          });
        }
      }
    },

    *addText({ payload }: any, { put, call }: any) {
      const response: TextType = yield call(addText, payload);
      if (response) {
        const texts: { data: TextsStateType.Texts } = yield call(queryTexts);
        if (texts) {
          yield put({
            type: 'update',
            payload: { texts: texts.data, text: initText },
          });
        }
      }
    },

    *updateText({ payload }: any, { put, call }: any) {
      const response: TextType = yield call(updateText, payload);
      if (response) {
        const texts: { data: TextsStateType.Texts } = yield call(queryTexts);
        if (texts) {
          yield put({
            type: 'update',
            payload: { texts: texts.data, text: initText },
          });
        }
      }
    },

    *deleteText({ payload }: any, { put, call }: any) {
      yield call(deleteText, payload);
      const texts: { data: TextsStateType.Texts } = yield call(queryTexts);
      if (texts) {
        yield put({
          type: 'update',
          payload: { texts: texts.data },
        });
      }
    },
  },
  reducers: {
    update(state: TextStateType, action: { payload: any }) {
      return {
        ...state,
        ...action.payload,
      };
    },
    afterEdit(state: TextStateType) {
      return {
        ...state,
        text: initText,
      };
    },
  },
};
export default Text;
