// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import routes from './routes';
export default defineConfig({
  base: '/',
  hash: true,
  antd: {},
  dva: {},
  request: {},
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
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: true,
  define: {},
});
