import { Context } from 'egg';

export const isMobile = (ctx:Context) => {
  const source = ctx.get('user-agent') || '';
  let isMobile = false;
  if (/mobile|android|iphone|ipad|phone/i.test(source)) {
    isMobile = true;
  }
  return isMobile;
};

export const parseCookie = (ctx:Context) => {
  const cookie = ctx.get('cookie');
  if (!cookie) {
    return [];
  }
  const cookies = cookie.split(';');
  const res = {};
  for (const item of cookies) {
    const kv = item.split('=');
    if (kv && kv.length > 0) {
      res[kv[0].trim()] = decodeURIComponent(kv[1]);
    }
  }
  return res;
};

export const parseNavLang = (ctx:Context) => {
  // 服务端无法获取navigator.language，所以只能通过Accept-Language来判断浏览器语言。
  let navigatorLang;
  const clientLang = ctx.get('Accept-Language');
  if (clientLang.startsWith('zh')) {
    navigatorLang = 'zh-CN';
  } else if (clientLang.startsWith('en')) {
    navigatorLang = 'en-US';
  }
  return navigatorLang;
};


// 处理成功响应
export const success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
  ctx.status = 200;
};
