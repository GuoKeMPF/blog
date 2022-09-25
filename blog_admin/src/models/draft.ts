import { queryDrafts, queryDraft, addDraft, updateDraft, deleteDraft } from '@/services/draft';

import { formType } from '@/utils/enum';

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
    *queryDrafts({ payload }: any, { put, call }: any) {
      const response: { data: DraftsResponseType } = yield call(queryDrafts, payload);
      const res = response.data;
      if (res) {
        const { data = [], count: total = 0, size = 0, page = 1 } = res;
        yield put({
          type: 'update',
          payload: { drafts: data, total, size, page },
        });
      }
    },

    *queryDraft({ payload }: any, { put, call }: any) {
      const { id, ...other } = payload;
      const response: { data: DraftType } = yield call(queryDraft, { id });
      const res = response.data;
      if (res) {
        yield put({
          type: 'update',
          payload: { draft: res, ...other },
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
        const response: { data: DraftType } = yield call(queryDraft, { id });
        const res = response.data;
        if (res) {
          yield put({
            type: 'update',
            payload: { draft: { ...res, type, visable: true } },
          });
        }
      }
    },

    *addDraft({ payload }: any, { put, call }: any) {
      const response: { data: DraftType } = yield call(addDraft, payload);
      const res = response.data;
      if (res) {
        const draftsList: { data: DraftsResponseType } = yield call(queryDrafts, payload);
        const { data } = draftsList;
        if (data) {
          const { data: drafts = [], count: total = 0, size = 0, page = 1 } = data;
          yield put({
            type: 'update',
            payload: { drafts: drafts, total, size, page, draft: initDraft },
          });
        }
      }
    },

    *updateDraft({ payload }: any, { put, call }: any) {
      const response: { data: DraftType } = yield call(updateDraft, payload);
      const res = response.data;
      if (res) {
        const draftsList: { data: DraftsResponseType } = yield call(queryDrafts, payload);
        const { data } = draftsList;
        if (data) {
          const { data: drafts = [], count: total = 0, size = 0, page = 1 } = data;
          yield put({
            type: 'update',
            payload: { drafts: drafts, total, size, page, draft: initDraft },
          });
        }
      }
    },

    *deleteDraft({ payload }: any, { put, call }: any) {
      const response: { data: DraftType } = yield call(deleteDraft, payload);
      if (response.data) {
        const drafts: {
          data: { data: DraftsStateType.Drafts; total: number; size: number; page: number };
        } = yield call(queryDrafts);
        const res = drafts.data;
        if (res) {
          const { data = [], total = 0, size = 0, page = 1 } = res;
          yield put({
            type: 'update',
            payload: { drafts: data, total, size, page },
          });
        }
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
