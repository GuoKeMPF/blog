"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const map = new Map();
map.set('a', 'AAAAA').set('b', 'BBBBB');
console.log(map);
const deleteResultA = map.delete('a');
console.log(map);
console.log(deleteResultA);
const deleteResultC = map.delete('c');
console.log(map);
console.log(deleteResultC);
var _default = {};
exports.default = _default;