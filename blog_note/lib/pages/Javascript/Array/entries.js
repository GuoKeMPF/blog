"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const arr1 = ['a', 'b', 'c'];
const iterator1 = arr1.entries();
console.log(iterator1.next());
// { value: [ 0, 'a' ], done: false }
console.log(iterator1.next());
// { value: [ 1, 'b' ], done: false }
console.log(iterator1.next());
// { value: [ 2, 'c' ], done: false }
console.log(iterator1.next());
// { value: undefined, done: true }
var _default = {};
exports.default = _default;