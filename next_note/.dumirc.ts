import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'note',
    logo: '/favicon.ico',
    footer: `Copyright © ${new Date().getFullYear()}`,
  },
  resolve: {
    forceKebabCaseRouting: false,
  },
});
