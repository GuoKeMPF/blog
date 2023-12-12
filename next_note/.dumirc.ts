import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'note',
    logo: '/favicon.ico',
  },
  resolve: {
    forceKebabCaseRouting: false
  }
});
