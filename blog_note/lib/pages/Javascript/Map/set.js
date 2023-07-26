"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const map = new Map();
map.set(1, 11);
map.set('1', '1111');
/**
 * 1 和 '1' 会被识别为不同的 key
 */

map.set(1, 111111);
/**
 * 再次对 map 已存在的 key 进行 set 会覆盖之前的值
 */

/**
 * key 可以为任意值
 */
const key = {
  a: 'aa'
};
map.set(key, {
  a: 'AAA'
});
const getValue = map.get(key);
console.log('getValue', getValue);

/**
 * 不同的引用值会被当成不同的值
 */
map.set({
  a: 'aa'
}, {
  a: 'AAAAAAA'
});
map.set({
  b: 'bb'
}, {
  b: 'BBB'
});
const getValue1 = map.get({
  b: 'bb'
});
console.log('getValue1', getValue1);

/**
 * 链式赋值
 */
const m = new Map();
m.set(1, '111').set(2, '222').set(3, 333);

/**
 * {
 *  1 => 111111,
 *  '1' => '1111',
 *  { a: 'aa' } => { a: 'AAA' },
 *  { a: 'aa' } => { a: 'AAAAAAA' },
 *  { b: 'bb' } => { b: 'BBB' }
 * }
 */

console.log(map);
var _default = {};
exports.default = _default;