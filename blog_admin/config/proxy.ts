let target = '';
// target = `http://localhost:8000/`;
target = `http://0.0.0.0:8000/`;
target = `https://api.mapanfeng.com/`;

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
