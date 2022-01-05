import { history } from 'umi';

import type { Effect, Reducer } from 'umi';
import { login, logout } from '@/services/user';
import { set, clear, get } from '@/utils/sessionStorage';

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
    username: get('username') || '',
  },
  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(login, payload);
      if (!res) {
        return;
      }
      if (res.code === 1) {
        yield put({
          type: 'update',
          payload: {
            username: res.data,
          },
        });
        set('username', res.data);
        window.cookieStore.get('csrftoken').then((cookie: any) => {
          set('csrftoken', cookie.value);
        });
        history.push('/dashboard');
      }
      return res;
    },
    *logout(_action, { call, put }) {
      console.log('*logout');

      yield call(logout);
      yield put({
        type: 'update',
        payload: {
          username: '',
        },
      });
      clear();
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
