import { extend } from 'umi-request';
import { history } from 'umi';
import { notification } from 'antd';
import { getSession, sessionKeys } from '@/utils/sessionStorage';

// handling error in response interceptor
const errorHandler = (error: any) => {
  const { response } = error;
  const codeMaps: Record<string | number, any> = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };

  const message = codeMaps[response.status];
  const description = response.message;
  if (message) {
    notification.error({
      message,
      description,
    });
  }
  return response;
};
const request = extend({
  // error handler
  errorHandler,
  credentials: 'include', // request with cookie
  prefix: BASE_URL,
});
// request request
request.interceptors.request.use((url, options) => {
  const { headers = {} }: { headers?: any } = options;
  const token: string | undefined = getSession(sessionKeys.token);
  if (token) {
    headers.Authorization = token;
  }
  const csrftoken: string | undefined = getSession(sessionKeys.csrftoken);
  if (csrftoken) {
    headers['X-CSRFToken'] = csrftoken;
  }
  options.headers = headers;
  return {
    url: `${url}`,
    options: { ...options },
  };
});

// response interceptors
request.interceptors.response.use(async (response) => {
  if (response.status === 403) {
    history.push('/user/login');
  }
  const data = await response.clone().json();
  data.status = response.status;
  return { ...response, status: response.status, data: data };
  // return response;
});

/**
 * @param url Required request url
 * @param params Optional the params with get request
 * @param options Optional something config for request
 * @returns promise
 */
export const Get = async (
  url: string,
  params?: Record<string, any>,
  options?: Record<string, any>,
) =>
  request(url, {
    method: 'get',
    params,
    ...options,
  });

/**
 * @param url Required request url
 * @param data Optional the params with post request
 * @param options Optional something config for request
 * @returns promise
 */
export const Post = async (
  url: string,
  data?: Record<string, any>,
  options?: Record<string, any>,
) =>
  request(url, {
    method: 'post',
    data,
    ...options,
  });

/**
 * @param url Required, request url
 * @param param1
 * @param data Optional, the params with post request
 * @param options Optional something config for request
 * @returns promise
 */
export const Put = async (url: string, data?: Record<string, any>, options?: Record<string, any>) =>
  request(url, {
    method: 'put',
    data,
    ...options,
  });

/**
 * @param url Required, request url
 * @param data Optional, the params with delete request
 * @param options Optional something config for request
 * @returns
 */
export const Delete = async (
  url: string,
  data?: Record<string, any>,
  options?: Record<string, any>,
) =>
  request(url, {
    method: 'delete',
    data,
    ...options,
  });

/**
 * @param url Required, request url
 * @param body Optional, the body with delete request
 * @param options Optional something config for request
 * @returns
 */
export const Upload = async (url: string, body?: FormData, options?: Record<string, any>) =>
  request(url, {
    method: 'post',
    body,
    requestType: 'form',
    ...options,
  });

export default request;
