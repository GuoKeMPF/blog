import { defineConfig } from 'umi';
import { proxy } from './proxy';
import { BASE_URL_DEV } from './baseUrl';

export default defineConfig({
  mock: false,
  proxy,
  define: {
    BASE_URL: BASE_URL_DEV,
  },
});
