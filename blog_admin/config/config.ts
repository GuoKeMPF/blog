// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import routes from './routes';

import { BASE_URL } from './baseUrl';
export default defineConfig({
  hash: true,
  antd: {},
  dva: {},
  request: {},
  favicons: ['/favicon.ico'],
  initialState: {},
  model: {},
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  targets: {},
  publicPath: '/',
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'root-entry-name': 'variable',
  },
  ignoreMomentLocale: true,
  presets: ['umi-presets-pro'],
  // Fast Refresh 热更新
  fastRefresh: true,
  define: {
    BASE_URL,
  },
});
