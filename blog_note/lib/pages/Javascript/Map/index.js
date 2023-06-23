"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const map = new Map();
map.set(1, '1');
map.set('1', '11');
map.set(1, 111111);

/**
 * Map(2) {1 => 111111, '1' => '11'}
 */
console.log(map);
const map1 = new Map([[1, '1'], [2, '2']]);
console.log(map1);
const map2 = new Map();
map2.set(1, 11);
map2.set('1', '1111');
/**
 * 1 和 '1' 会被识别为不同的 key
 */

map2.set(1, 111111);
/**
 * 再次对 map 已存在的 key 进行 set 会覆盖之前的值
 */
console.log(map);
const obj = {};
obj[1] = 11;
obj['1'] = '111';
/**
 * 1 和 '1' 会被识别为相同的 key
 */
obj[1] = 1111;
console.log(obj);

/**
 * { '1': 1111 }
 */
var _default = {};
exports.default = _default;