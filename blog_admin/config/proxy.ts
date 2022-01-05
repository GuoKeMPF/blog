/**
 * proxy host
 */
const host = 'http://localhost';

/**
 * proxy port
 */
const port = '8000';

/**
 * proxy target
 */
const target = `${host}:${port}`;

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
