/**
 * proxy target
 */

 let target = '';
 // target = `http://localhost:8000`;
 target = `https://mapanfeng.com`;

/**
 * proxy config
 */

export const proxy = {
  '/api': {
    target,
    changeOrigin: true,
    pathRewrite: { '^/api': '/api' },
  },
};
