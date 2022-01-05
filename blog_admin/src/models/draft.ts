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

export interface DraftStateType {
  drafts: DraftsStateType.Drafts;
  draft: DraftsStateType.Draft;
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
  draft: initDraft,
};

const Draft = {
  namespace: 'draft',
  state: initState,
  effects: {
    *queryDrafts(_action: any, { put, call }: any) {
      const response: { data: DraftsStateType.Drafts } = yield call(queryDrafts);
      if (response) {
        yield put({
          type: 'update',
          payload: { drafts: response.data },
        });
      }
    },

    *queryDraft({ payload }: any, { put, call }: any) {
      const { id, ...other } = payload;
      const response: DraftType = yield call(queryDraft, { id });
      if (response) {
        yield put({
          type: 'update',
          payload: { draft: response, ...other },
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
        const response: DraftType = yield call(queryDraft, { id });
        if (response) {
          yield put({
            type: 'update',
            payload: { draft: { ...response, type, visable: true } },
          });
        }
      }
    },

    *addDraft({ payload }: any, { put, call }: any) {
      const response: DraftType = yield call(addDraft, payload);
      if (response) {
        const drafts: { data: DraftsStateType.Drafts } = yield call(queryDrafts);
        if (drafts) {
          yield put({
            type: 'update',
            payload: { drafts: drafts.data, draft: initDraft },
          });
        }
      }
    },

    *updateDraft({ payload }: any, { put, call }: any) {
      const response: DraftType = yield call(updateDraft, payload);
      if (response) {
        const drafts: { data: DraftsStateType.Drafts } = yield call(queryDrafts);
        if (drafts) {
          yield put({
            type: 'update',
            payload: { drafts: drafts.data, draft: initDraft },
          });
        }
      }
    },

    *deleteDraft({ payload }: any, { put, call }: any) {
      yield call(deleteDraft, payload);
      const drafts: { data: DraftsStateType.Drafts } = yield call(queryDrafts);
      if (drafts) {
        yield put({
          type: 'update',
          payload: { drafts: drafts.data },
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
