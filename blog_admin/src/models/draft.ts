import { queryDrafts, queryDraft, addDraft, updateDraft, deleteDraft } from '@/services/draft';

import { formType } from '@/utils/enum';
import { ifResponseSuccess } from '@/utils/ifResponseSuccess';
import type { ResponseType } from '@/utils/ifResponseSuccess';

export interface DraftType {
  id: string;
  content: string;
  title: string;
  description: string;
  type?: string;
  visable?: boolean;
  [key: string]: any;
}

export namespace DraftsStateType {
  export type Draft = {
    id: string;
    content: string;
    title: string;
    description: string;
    [propname: string]: any;
  };
  export type Drafts = DraftType[];
}

export interface DraftsResponseType {
  data: DraftType[];
  count: number;
  size: number;
  page: number;
}

export interface DraftStateType {
  drafts: DraftsStateType.Drafts;
  draft: DraftsStateType.Draft;
  total: number;
  size: number;
  page: number;
}

const initDraft = {
  id: '',
  content: '',
  title: '',
  description: '',
  type: formType.create,
  visable: false,
};

const initState: DraftStateType = {
  drafts: [],
  total: 0,
  size: 0,
  page: 0,
  draft: initDraft,
};

const Draft = {
  namespace: 'draft',
  state: initState,
  effects: {
    *queryDrafts({ payload }, { put, call }) {
      const response: ResponseType = yield call(queryDrafts, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      const { body } = response;
      if (body) {
        const { data = [], count: total = 0, size = 0, page = 1 } = body;
        yield put({
          type: 'update',
          payload: { drafts: data, total, size, page },
        });
      }
    },

    *queryDraft({ payload }: any, { put, call }: any) {
      const { id, ...other } = payload;
      const response: ResponseType = yield call(queryDraft, { id });
      if (!ifResponseSuccess(response)) {
        return;
      }
      const { body } = response;
      if (body) {
        yield put({
          type: 'update',
          payload: { draft: body, ...other },
        });
      }
    },

    *toEdit({ payload }: any, { put, call }: any) {
      const { type = formType.create } = payload;
      if (type === formType.create) {
        yield put({
          type: 'update',
          payload: { draft: { ...initDraft, type, visable: true } },
        });
      } else {
        const { id } = payload;
        const response: ResponseType = yield call(queryDraft, { id });
        if (!ifResponseSuccess(response)) {
          return;
        }
        const { body } = response;
        if (body) {
          yield put({
            type: 'update',
            payload: { draft: { ...body, type, visable: true } },
          });
        }
      }
    },

    *addDraft({ payload }: any, { put, call }: any) {
      const response: ResponseType = yield call(addDraft, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      const draftsList: ResponseType = yield call(queryDrafts, payload);
      if (!ifResponseSuccess(draftsList)) {
        return;
      }
      const { body } = draftsList;
      if (body) {
        const { data: drafts = [], count: total = 0, size = 0, page = 1 } = body;
        yield put({
          type: 'update',
          payload: { drafts: drafts, total, size, page, draft: initDraft },
        });
      }
    },

    *updateDraft({ payload }: any, { put, call }: any) {
      const response: ResponseType = yield call(updateDraft, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      const draftsList: ResponseType = yield call(queryDrafts, payload);
      if (!ifResponseSuccess(draftsList)) {
        return;
      }
      const { body } = draftsList;
      if (body) {
        const { data: drafts = [], count: total = 0, size = 0, page = 1 } = body;
        yield put({
          type: 'update',
          payload: { drafts: drafts, total, size, page, draft: initDraft },
        });
      }
    },

    *deleteDraft({ payload }: any, { put, call }: any) {
      const response: ResponseType = yield call(deleteDraft, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      const draftsList: ResponseType = yield call(queryDrafts, payload);
      if (!ifResponseSuccess(draftsList)) {
        return;
      }
      const { body } = draftsList;
      if (body) {
        const { data: drafts = [], count: total = 0, size = 0, page = 1 } = body;
        yield put({
          type: 'update',
          payload: { drafts: drafts, total, size, page, draft: initDraft },
        });
      }
    },
  },
  reducers: {
    update(state: DraftStateType, action: { payload: any }) {
      return {
        ...state,
        ...action.payload,
      };
    },
    afterEdit(state: DraftStateType) {
      return {
        ...state,
        draft: initDraft,
      };
    },
  },
};
export default Draft;
