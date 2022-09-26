import { queryTexts, queryText, addText, updateText, deleteText } from '@/services/text';

import { formType } from '@/utils/enum';
import { ifResponseSuccess } from '@/utils/ifResponseSuccess';
import type { ResponseType } from '@/utils/ifResponseSuccess';

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
  count: number;
  size: number;
  page: number;
}

export interface TextStateType {
  texts: TextsStateType.Texts;
  text: TextsStateType.Text;
  total: number;
  size: number;
  page: number;
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
      const response: ResponseType = yield call(queryTexts, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      const { body } = response;
      if (body) {
        const { data = [], count: total = 0, size = 0, page = 1 } = body;
        yield put({
          type: 'update',
          payload: { texts: data, total, size, page },
        });
      }
    },

    *queryText({ payload }: any, { put, call }: any) {
      const { id, ...other } = payload;
      const response: ResponseType = yield call(queryText, { id });
      if (!ifResponseSuccess(response)) {
        return;
      }
      const { body } = response;
      if (body) {
        yield put({
          type: 'update',
          payload: { ...other, text: body },
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
        const response: ResponseType = yield call(queryText, { id });
        if (!ifResponseSuccess(response)) {
          return;
        }
        const { body } = response;
        if (body) {
          yield put({
            type: 'update',
            payload: { text: { ...body, type, visable: true } },
          });
        }
      }
    },

    *addText({ payload }: any, { put, call }: any) {
      const response: ResponseType = yield call(addText, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      const texts: ResponseType = yield call(queryTexts);
      const { body } = texts;
      if (body) {
        const { data = [], count: total = 0, size = 0, page = 1 } = body;
        yield put({
          type: 'update',
          payload: { texts: data, total, size, page, text: initText },
        });
      }
    },

    *updateText({ payload }: any, { put, call }: any) {
      const response: ResponseType = yield call(updateText, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      const texts: ResponseType = yield call(queryTexts);
      const { body } = texts;
      if (body) {
        const { data = [], count: total = 0, size = 0, page = 1 } = body;
        yield put({
          type: 'update',
          payload: { texts: data, total, size, page, text: initText },
        });
      }
    },

    *deleteText({ payload }: any, { put, call }: any) {
      const response: ResponseType = yield call(deleteText, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      const texts: ResponseType = yield call(queryTexts);
      const { body } = texts;
      if (body) {
        const { data = [], count: total = 0, size = 0, page = 1 } = body;
        yield put({
          type: 'update',
          payload: { texts: data, total, size, page },
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
