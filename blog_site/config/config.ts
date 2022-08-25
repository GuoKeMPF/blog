import { resolve } from 'path';
import { defineConfig } from 'umi';
import { routes } from './routes';

export default defineConfig({
  // eact-helmet 与 umi 中的 title 配置不能同时使用
  title: undefined,
  targets: {},
  autoprefixer: false,
  history: {
    type: 'browser',
  },
  mfsu: {},
  publicPath: '/public/',
  // public
  ssr: {
    // devServerRender: true,
  },
  // dva
  dva: {},
  // antd
  antd: undefined,
  // 异步加载
  // dynamicImport: {
  //   loading: '@/Loading',
  // },
  locale: {
    default: 'zh-CN',
    title: false,
    // localStorage 中 umi_locale 值 > 浏览器检测 > default 设置的默认语言 > 中文
    baseNavigator: true,
    baseSeparator: '-',
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
});
