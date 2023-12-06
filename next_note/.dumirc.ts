import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'note',
    showLineNum: true,
    socialLinks: {
      github: 'https://github.com/GuoKeMPF',
    },
  },
  ssr: {},
  exportStatic: { ignorePreRenderError: true },
  favicons: ['/favicon.ico'],
  metas: [
    { name: 'keywords', content: 'note' },
    { name: 'description', content: 'note' },
  ],
});
