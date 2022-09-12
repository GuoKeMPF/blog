/**
 * proxy target
 */

import { BASE_URL } from '../config/baseUrl';
let target = '';
target = `http://localhost:8000`

/**
 * proxy config
 */

export const proxy = {
  [BASE_URL]: {
    target,
    changeOrigin: true,
  },
};
