// https://umijs.org/config/
import { defineConfig } from 'umi';
import { BASE_URL_DEV } from './baseUrl';

export default defineConfig({
  mock: {},
  define: {
    BASE_URL: BASE_URL_DEV,
  },
});
