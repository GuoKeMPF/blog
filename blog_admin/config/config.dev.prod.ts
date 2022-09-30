// https://umijs.org/config/
import { defineConfig } from 'umi';
import { BASE_URL } from './baseUrl';

export default defineConfig({
  define: {
    BASE_URL,
  },
  proxy: undefined,
});
