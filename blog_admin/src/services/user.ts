import { user } from './api';
import { Post } from './requset';
import type { LoginParamsType } from 'umi';

export const login = async (data: LoginParamsType) => Post(user.login, data);

export const logout = async () => Post(user.logout);
