import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1663738477565_5062';

  // add your egg config in here
  config.middleware = [ 'errorHandler', 'token' ];
  config.errorHandler = {
    match: '/',
  };
  config.cluster = {
    listen: {
      port: 8001,
      hostname: '0.0.0.0', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
    },
  };

  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.html': 'nunjucks',
      '.js': 'assets',
    },
  };
  config.multipart = {
    mode: 'file',
  };
  config.assets = {
    publicPath: '/public',
    devServer: {
      enable: true,
      port: 8001,
    },
  };

  config.login = {
    isLogin: [],
    // 登录有效时长
    duration: 10 * 60000,
  };
  config.cors = {
    enable: true,
    credentials: true,
    package: 'egg-cors',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };

  config.logger = {
    consoleLevel: 'NONE',
    coreLogger: {
      // consoleLevel: 'DEBUG',
    },
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
