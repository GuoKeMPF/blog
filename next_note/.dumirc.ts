import { defineConfig } from 'dumi';

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

export default defineConfig({
  mfsu: false,
  themeConfig: {
    name: 'note',
    showLineNum: true,
    socialLinks: {
      github: 'https://github.com/GuoKeMPF',
    },
  },
  // ssr: {},
  exportStatic: { ignorePreRenderError: true },
  favicons: ['/favicon.ico'],
  metas: [
    { name: 'keywords', content: 'note' },
    { name: 'description', content: 'note' },
  ],
  lessLoader: { javascriptEnabled: true },

  chainWebpack(memo) {
    memo
      .plugin('monaco-editor-webpack-plugin')
      .use(MonacoWebpackPlugin, [
        { languages: ['javascript', 'typescript', 'html', 'less', 'css'] },
      ]);
    memo.output.globalObject('self');
  },
});
