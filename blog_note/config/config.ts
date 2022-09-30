import { defineConfig } from 'dumi';
import navs from './navs';
import menus from './menus';
import WebpackChain from 'webpack-chain';

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

// const repo = 'note/';
const repo = '';

// more config: https://d.umijs.org/config
export default defineConfig({
  alias: {
    '@': '/src',
  },
  title: 'Note',
  favicon: `/${repo}images/logo.png`,
  logo: `/${repo}images/logo.png`,
  outputPath: `dist/${repo}`,
  mode: 'site',
  devServer: {
    port: 3000,
  },
  dynamicImport: {},
  // mfsu: {},
  locales: [['zh-CN', '中文']],
  // fastRefresh: {},
  // ssr: {},
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  hash: true,
  // Because of using GitHub Pages
  base: `/${repo}`,
  publicPath: `/${repo}`,
  navs,
  menus,
  chainWebpack(memo: WebpackChain) {
    memo
      .plugin('monaco-editor-webpack-plugin')
      .use(MonacoWebpackPlugin, [
        { languages: ['javascript', 'typescript', 'html', 'less', 'css'] },
      ]);
    memo.output.globalObject('self');
  },
});
