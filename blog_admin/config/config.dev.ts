// https://umijs.org/config/
import { defineConfig } from 'umi';
import { proxy } from './proxy';

export default defineConfig({
  // https://umijs.org/docs/api/config#mock
  mock: {},
  proxy,
  define: {
  },
});
