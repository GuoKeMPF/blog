import { history } from 'umi';

import { login, logout } from '@/services/user';
import { setSession, clearSession, getSession, sessionKeys } from '@/utils/sessionStorage';
import type { Effect, Reducer } from 'umi';

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
      const res = yield call(login, payload);
      const { data } = res;
      if (!data) {
        return;
      }
      if (data) {
        yield put({
          type: 'update',
          payload: {
            userInfo: res.data,
            username: res.data.username,
            csrftoken: res.data.csrftoken,
          },
        });
        setSession(sessionKeys.csrftoken, res.data.csrftoken);
        setSession(sessionKeys.username, res.data.username);
        setSession(sessionKeys.token, res.data.token);
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
