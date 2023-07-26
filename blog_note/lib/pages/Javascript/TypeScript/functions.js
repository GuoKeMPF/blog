"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const fun1 = () => {
  console.log('sss');
};
const fun2 = arr => {
  console.log(arr.reduce((pre, cur) => pre + cur, 0));
};
const fun3 = arr => {
  return arr.reduce((pre, cur) => pre + cur, 0);
};
var _default = {};
exports.default = _default;