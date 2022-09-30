---
title: Map
toc: menu
---

# Map

`Map` 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。

## Objects 和 Map 的比较

Objects 和 Maps 类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成 Maps 使用。不过 Maps 和 Objects 有一些重要的区别，在下列情况里使用 Map 会是更好的选择：

|          | Map                                                                            | Object                                                                                                                                                                            |
| :------- | :----------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 意外的键 | Map 默认情况不包含任何键。只包含显式插入的键。                                 | 一个 Object 有一个原型, 原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。 备注：虽然 ES5 开始可以用 Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见。 |
| 键的类型 | 一个 Map 的键可以是任意值，包括函数、对象或任意基本类型。                      | 一个 Object 的键必须是一个 String 或是 Symbol。                                                                                                                                   |
| 键的顺序 | Map 中的 key 是有序的。因此，当迭代的时候，一个 Map 对象以插入的顺序返回键值。 | 一个 Object 的键是无序的备注：自 ECMAScript 2015 规范以来，对象确实保留了字符串和 Symbol 键的创建顺序； 因此，在只有字符串键的对象上进行迭代将按插入顺序产生键。                  |
| Size     | Map 的键值对个数可以轻易地通过 size 属性获取                                   | Object 的键值对个数只能手动计算                                                                                                                                                   |
| 迭代     | Map 是 iterable 的，所以可以直接被迭代。                                       | 迭代一个 Object 需要以某种方式获取它的键然后才能迭代。                                                                                                                            |
| 性能     | 在频繁增删键值对的场景下表现更好。                                             | 在频繁添加和删除键值对的场景下未作出优化。                                                                                                                                        |

```ts
const map = new Map();

map.set(1, '1');
map.set('1', '11');
map.set(1, 111111);

/**
 * Map(2) {1 => 111111, '1' => '11'}
 */
console.log(map);

const map1 = new Map([
  [1, '1'],
  [2, '2'],
]);

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

const obj: any = {};
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
```

## Map.set

`myMap.set(key, value)` 往 map 内设置值

**参数**

`key` 要添加至相应 Map 对象的元素的键。
`value` 要添加至相应 Map 对象的元素的值。

**返回值**

Map 对象

```ts
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
const key = { a: 'aa' };
map.set(key, { a: 'AAA' });
const getValue = map.get(key);
console.log('getValue', getValue);
// getValue { a: 'AAA' }

/**
 * 不同的引用值会被当成不同的值
 */
map.set({ a: 'aa' }, { a: 'AAAAAAA' });

map.set({ b: 'bb' }, { b: 'BBB' });
const getValue1 = map.get({ b: 'bb' });
console.log('getValue1', getValue1);
// getValue1 undefined

/**
 * 链式赋值
 */
const m = new Map();
m.set(1, '111')
  .set(2, '222')
  .set(3, 333);
console.log(map);
/**
 * {
 *  1 => 111111,
 *  '1' => '1111',
 *  { a: 'aa' } => { a: 'AAA' },
 *  { a: 'aa' } => { a: 'AAAAAAA' },
 *  { b: 'bb' } => { b: 'BBB' }
 * }
 */
```

## Map.get

`myMap.get(key)` 返回某个 Map 对象中的一个指定元素

**参数**

`key` 必须参数，也是它唯一的参数，要从目标 Map 对象中获取的元素的键。

**返回值**

返回一个 Map 对象中与指定键相关联的值，如果找不到这个键则返回 undefined。

```ts
const map = new Map();

map.set('a', 'AAAAA');

const a = map.get('a');
console.log(a);
// AAAAA

const b = map.get('b');
console.log(b);
// undefined
```

## Map.size

size 是可访问属性，用于返回 一个 Map 对象的成员数量

size 属性的值是一个整数，表示 Map 对象有多少个键值对。size 是只读属性，用 set 方法修改 size 返回 undefined，即不能改变它的值

```ts
const map = new Map();
map.set('a', 'alpha');
map.set('b', 'beta');
map.set('g', 'gamma');

console.log(map.size);
```

## Map.delete

`myMap.delete(key)` 移除 Map 对象中指定的元素。

**参数**

`key` 必须参数，也是它唯一的参数，要从目标 Map 对象中移除的元素的键。

**返回值**

Boolean

如果 Map 对象中存在该元素，则移除它并返回 true；否则如果该元素不存在则返回 false。

```ts
type Key = string;
type Value = string;

const map: Map<Key, Value> = new Map();
map.set('a', 'AAAAA').set('b', 'BBBBB');

console.log(map);

const deleteResultA = map.delete('a');
console.log(map);
console.log(deleteResultA);

const deleteResultC = map.delete('c');
console.log(map);
console.log(deleteResultC);
/**
 * Map(2) { 'a' => 'AAAAA', 'b' => 'BBBBB' }
 * Map(1) { 'b' => 'BBBBB' }
 * true
 * Map(1) { 'b' => 'BBBBB' }
 * false
 * /

```

## Map.clear

clear()方法会移除 Map 对象中的所有元素。

**语法**

Map.clear();

**返回值**

undefined.

```ts
type Key = string;
type Value = string;

const map: Map<Key, Value> = new Map();
map.set('a', 'AAAAA').set('b', 'BBBBB');
console.log(map);
// Map(2) { 'a' => 'AAAAA', 'b' => 'BBBBB' }

map.clear();
console.log(map);
// Map(0) {}

map.set('c', 'CCCCC');
console.log(map);
// Map(1) { 'c' => 'CCCCC' }
```
