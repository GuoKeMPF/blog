// https://umijs.org/config/
import { defineConfig } from 'umi';
import { proxy } from './proxy';

import { BASE_URL_DEV } from './baseUrl';

export default defineConfig({
  // https://umijs.org/docs/api/config#mock
  proxy,
  define: {
    BASE_URL: BASE_URL_DEV,
  },
});
