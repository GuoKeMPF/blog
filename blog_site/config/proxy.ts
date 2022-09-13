
let target = '';
target = `http://localhost:8000/`

/**
 * proxy config
 */

 export const proxy = {
  '/api': {
    target,
    changeOrigin: true,
    pathRewrite: { '/api': '' },
  },
};
