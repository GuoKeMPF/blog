import { resolve } from 'path';
import { defineConfig } from 'umi';
import { routes } from './routes';

import { BASE_URL } from "./baseUrl";


export default defineConfig({
  // eact-helmet 与 umi 中的 title 配置不能同时使用
  title: false,
  targets: false,
  autoprefixer: false,
  history: {
    type: 'browser',
  },
  mfsu: false,
  favicon: '/public/favicon.ico',
  publicPath: '/public/',
  // public
  ssr: {
    mode: 'stream',
    // devServerRender: true,
  },
  // dva
  dva: {
    immer: true,
    hmr: false,
  },
  // antd
  antd: false,
  // 异步加载
  dynamicImport: {
    loading: '@/Loading',
  },
  devServer: {
    port: 3000,
  },
  locale: {
    default: 'zh-CN',
    title: false,
    // localStorage 中 umi_locale 值 > 浏览器检测 > default 设置的默认语言 > 中文
    baseNavigator: true,
    baseSeparator: '-',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  // routes,
  chainWebpack(config) {
    config.module
      .rule('media')
      .test(/\.(mp3|4)$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'));
    config.resolve.alias.set('~@', resolve(__dirname, './src'));
  },
  define:{
    BASE_URL
  }
});