"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const string1 = 'str1';
const string2 = new String('wwwwww');
const str = `hello word`;
console.log(str);
console.log(string1 == string2);
console.log(string1 === string2);
const array1 = ['1', '2'];
const array2 = ['1', 2];
const array3 = ['1', 2, true, null, undefined, {
  a: 'aaa'
}, [1, 2, 3]];
const arr1 = new Array(1, 2, 3);
const arr2 = new Array(1, '2', 3);
const arr3 = new Array('1', 2, true, null, undefined, {
  a: 'aaa'
}, [1, 2, 3]);
const obj1 = {
  name: '小明',
  age: 18,
  sex: '女',
  say: function say(p) {
    console.log(`${this.name} say ${p}`);
    return `${this.name} say ${p}`;
  }
};
obj1.say('11111');
var _default = {};
exports.default = _default;