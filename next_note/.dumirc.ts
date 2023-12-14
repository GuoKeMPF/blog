import { defineConfig } from 'dumi';


const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'note',
    logo: '/favicon.ico',
    footer: `Copyright © ${new Date().getFullYear()}`,
    nav: {
      // mode可选值有：override、append、prepend
      // - override: 直接覆盖约定导航，与 nav: [{ title: 'Blog', link: '/blog' }] 配置相同
      // - append: 将 value 中的导航追加到约定路由后面
      // - prepend: 将 value 中的导航添加到约定路由前面
      mode: 'override',
      value: [{ title: '目录', link: '/directory' }],
    },
  },
  resolve: {
    forceKebabCaseRouting: false,
  },
  chainWebpack(memo) {
    memo
      .plugin('monaco-editor-webpack-plugin')
      .use(MonacoWebpackPlugin, [
        { languages: ['javascript', 'typescript', 'html', 'less', 'css'] },
      ]);
    memo.output.globalObject('self');
  },
});
