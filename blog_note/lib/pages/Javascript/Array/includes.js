"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const arr = [1, '2', 3];
const res1 = arr.includes(2);
const res2 = arr.includes('2');
console.log('res1', res1);
console.log('res2', res2);
const obj = {
  id: 1,
  value: 1
};
const arrOjb = [obj];
const res3 = arrOjb.includes(obj);
const res4 = arrOjb.includes({
  id: 1,
  value: 1
});
console.log('res3', res3);
console.log('res4', res4);
var _default = {};
exports.default = _default;