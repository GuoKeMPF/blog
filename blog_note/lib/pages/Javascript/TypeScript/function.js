"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function fun(params) {
  return `input ${params}`;
}
fun(11111);
const fun1 = params => {
  return `input ${params}`;
};
const fun2 = params => {
  const p = new Promise((res, rej) => {
    res(params);
  });
  return p;
};
var _default = {};
exports.default = _default;