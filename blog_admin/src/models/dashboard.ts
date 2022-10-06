import { getDashboard } from '@/services/dashboard';
import type { Effect, Reducer } from 'umi';
import { ifResponseSuccess } from '@/utils/ifResponseSuccess';

import type { ResponseType } from '@/utils/ifResponseSuccess';

export interface DashboardModelState {
  draft: number;
  text: number;
  picture: number;
  audio: number;
}

export interface DashboardModelType {
  namespace: 'dashboard';
  state: DashboardModelState;
  effects: {
    getDashboard: Effect;
  };
  reducers: {
    update: Reducer<DashboardModelState>;
  };
}

const UserModel: DashboardModelType = {
  namespace: 'dashboard',
  state: {
    draft: 0,
    text: 0,
    picture: 0,
    audio: 0,
  },
  effects: {
    *getDashboard({ payload }, { call, put }) {
      const res: ResponseType = yield call(getDashboard, payload);
      if (!ifResponseSuccess(res)) {
        return;
      }
      const { body } = res;
      if (body) {
        const { draft = 0, text = 0, picture = 0, audio = 0 } = body;
        yield put({
          type: 'update',
          payload: { draft, text, picture, audio },
        });
      }
      return res;
    },
  },
  reducers: {
    update(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default UserModel;
