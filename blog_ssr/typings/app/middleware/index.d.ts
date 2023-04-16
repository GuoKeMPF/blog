// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportErrorHandler from '../../../app/middleware/error_handler';
import ExportToken from '../../../app/middleware/token';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ExportErrorHandler;
    token: typeof ExportToken;
  }
}
