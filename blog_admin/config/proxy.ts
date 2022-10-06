let target = '';
// target = `http://localhost:8000/`;
target = `http://0.0.0.0:8000/`;

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
