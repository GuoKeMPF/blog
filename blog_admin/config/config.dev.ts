// https://umijs.org/config/
import { defineConfig } from 'umi';
import { proxy } from './proxy';

export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  mock: false,
  proxy,
  devServer: {
    port: 4000,
  },
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  define: {
    serverPort: ':8000',
  },
});
