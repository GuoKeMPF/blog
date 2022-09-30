import { history } from 'umi';

import { login, logout } from '@/services/user';
import { setSession, clearSession, getSession, sessionKeys } from '@/utils/sessionStorage';
import type { Effect, Reducer } from 'umi';

import { ifResponseSuccess } from '@/utils/ifResponseSuccess';

import type { ResponseType } from '@/utils/ifResponseSuccess';
export interface UserModelState {
  username: string;
}

export interface LoginParamsType {
  username: string;
  password: string;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    update: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    username: getSession(sessionKeys.username) || '',
  },
  effects: {
    *login({ payload }, { call, put }) {
      const res: ResponseType = yield call(login, payload);
      if (!ifResponseSuccess(res)) {
        return;
      }
      const { body } = res;
      if (body) {
        yield put({
          type: 'update',
          payload: {
            userInfo: body,
            username: body.username,
            csrftoken: body.csrftoken,
          },
        });
        setSession(sessionKeys.csrftoken, body.csrftoken);
        setSession(sessionKeys.username, body.username);
        setSession(sessionKeys.token, body.token);
        setSession(sessionKeys.userInfo, body);
        history.push('/dashboard');
      }
      return res;
    },
    *logout(_action, { call, put }) {
      yield call(logout);
      yield put({
        type: 'update',
        payload: {
          username: '',
        },
      });
      clearSession();
      history.push('/user/login');
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
