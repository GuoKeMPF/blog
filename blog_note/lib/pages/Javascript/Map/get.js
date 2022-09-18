"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const map = new Map();
map.set('a', 'AAAAA');
const a = map.get('a');
console.log(a); // AAAAA

const b = map.get('b');
console.log(b); // undefined

var _default = {};
exports.default = _default;