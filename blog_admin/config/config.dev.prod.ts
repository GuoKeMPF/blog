// https://umijs.org/config/
import { defineConfig } from 'umi';
import { BASE_URL } from './baseUrl';

console.log('pro');
export default defineConfig({
  define: {
    BASE_URL,
  },
  proxy: undefined,
});
