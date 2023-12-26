## 会改变原数组

---

### push

`Array.push(item1, item2, item3, ...)` 向数组的末尾添加一个或更多元素，并返回新的数组的长度。

#### 参数

item1, item2, item3, ... ， 向数组后面添加的元素

#### 返回值

新的数组的长度。

---

### unshift

`Array.unshift(item1, item2, item3, ...)` 向数组的开头添加一个或更多元素，并返回新的长度。

#### 参数

item1, item2, item3, ... ， 向数组前面添加的元素

#### 返回值

新的数组的长度。

---

### pop

`Array.pop()` 删除数组的最后一个元素并返回删除的元素

#### 返回值

被删除的元素。

---

### shift

`Array.shift()` 删除并返回数组的第一个元素。

#### 返回值

被删除的元素。

:::info

`push` 和 `pop` 可以模拟<b>栈</b>操作(先进后出)

`push` 和 `shift` 可以模拟<b>队列</b>操作(先进先出)

:::

### splice

`Array.splice(start,length,item1,.....,itemX)` 从数组中第 start 截取 lenght 位删除或者替换成新的元素。并返回截取的元素组成的新的数组。

#### 参数

**start**：截取的起始下标

**length**：截取的长度

**item1,.....,itemX**：替换的数组元素

```ts
const arr = [1, 2, 3, 4, 5, 6];
const arrSplice = arr.splice(1, 2, 'a', 'b');
console.log('arrSplice', arrSplice); // [2,3]
console.log('arr', arr); // [1, "a", "b", 4, 5, 6]
```

---

### reverse

`Array.reverse()`,让数组反序。

#### 返回值

翻转的数组。

---

### sort

`Array.sort(callback)`,数组排序方法，将元素组按照一定要求排序，默认升序，只用按照编码排序（字符串'40', 会排在字符串'5'之前）。

#### 参数

**callback**(pre,nex)=>result： 可选参数排序规则,根据返回值判断是否需要元素位置调换。

**pre**: 前面一个元素

**next**: 后面一个元素

**result**：是否需要换位置，result>0, pre 与 nex 调换位置，result < 0 则不动。

#### 返回值

排序后的数组。

```ts
const arr = [1, 6, 2, 5, 3, 4];
const arrSort = arr.sort();
console.log('arrSort', arrSort); //[ 1, 2, 3, 4, 5, 6 ]
console.log('arr', arr); // [ 1, 2, 3, 4, 5, 6 ]
```

## 不会改变原数组

### flat

`Array.flat(depth)` 数组扁平化处理，并返回扁平化处理后的数组。

#### 参数

**depth**：扁平化处理的深度。默认是 1，如果希望一直处理下去则可以设置成`Infinity`

#### 返回值

扁平化处理后的数组。

```ts
const arr = [0, 1, 2, [3, 4, [5, 6, [7, [8, 9]]]]];

const res1 = arr.flat();
const res2 = arr.flat(Infinity);

console.log('arr', arr);
// arr [0, 1, 2, [3, 4, [5, 6, [7, [8, 9]]]]]
console.log('res1', res1);
// res1 [0, 1, 2, 3, 4, [5, 6, [7, [8, 9]]]]
console.log('res2', res2);
// res2 res2 [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

---

### concant

`Array.concat(array1, array2, ...)` 合并两个或者多个值或数组，并返回合并后的数组。

#### 参数

**array1, array2, ...**: 参与合并操作的值或数组。

#### 返回值

合并后的数组

```ts
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];
const num1 = 10;

const arrConcat = arr1.concat(arr2, arr3, num1);

console.log('arr1', arr1); // [ 1, 2, 3 ]
console.log('arrConcat', arrConcat); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

---

### entries

`Array.entries()` 方法返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的键/值对。

#### 返回值

一个新的 Array 迭代器对象。Array Iterator 是对象，它的原型（\_\_proto\_\_:Array Iterator）上有一个 next 方法，可用用于遍历迭代器取得原数组的[key,value]。

```ts
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
```

---

### every

`Array.every(callback)` 判断数组中是否每一项都符合回调函数判断条件，有任何一个返回`false`,则整体返回`false`。

#### 参数

**canllback**：判断条件执行的函数。`(item,index,array)=>boolean`。

**item**：数组中的元素。

**index**：元素的下标。

**array**：被循环的数组。

#### 返回值

Boolean，如果每一项在函数执行完成之后返回`true`则为`true`，有一项为任何`false`,则返回`false`。

```ts
const arr = [2, 3, 4];
// 每一项都大于1
const res1 = arr.every((item) => item > 1);
console.log('res1', res1); //true
// 每一项都大于2
const res2 = arr.every((item) => item > 2);
console.log('res2', res2); //false
```

---

### some

`Array.some(callback)` 判断数组中是否存在符合回调函数判断条件，任何一项返回`true`,则整体返回`true`。

#### 参数

**canllback**：判断条件执行的函数。`(item,index,array)=>boolean`。

**item**：数组中的元素。

**index**：元素的下标。

**array**：被循环的数组。

#### 返回值

Boolean，如果存在一项在函数执行完成之后返回`true`则为`true`，所有项都返回`false`,则返回`false`。

```ts
const arr = [2, 3, 4];
// 存在4大于3
const res1 = arr.some((item) => item > 3);
console.log('res1', res1); //true
// 没有任何一项大于4
const res2 = arr.some((item) => item > 4);
console.log('res2', res2); //false
```

---

### find

`Array.find(callback)`返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

#### 参数

**canllback**：判断条件执行的函数。`(item,index,array)=>boolean`。

**item**：数组中的元素。

**index**：元素的下标。

**array**：被循环的数组。

#### 返回值

第一个让回到函数返回 true 的数组元素，如果都不满足，则返回 false。

```ts
const arr: { id: number; value: number }[] = [
  {
    id: 1,
    value: 1,
  },
  {
    id: 2,
    value: 2,
  },
  {
    id: 3,
    value: 3,
  },
  {
    id: 4,
    value: 3,
  },
  {
    id: 5,
    value: 2,
  },
  {
    id: 6,
    value: 1,
  },
];
const arrFind = arr.find((item) => item.value === 2);
console.log('arrFind', arrFind);
// arrFind { id: 2, value: 2 }
```

### findIndex

`Array.findIndex(callback)`方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。

#### 参数

**canllback**：判断条件执行的函数。`(item,index,array)=>boolean`。

**item**：数组中的元素。

**index**：元素的下标。

**array**：被循环的数组。

#### 返回值

第一个让回到函数返回 true 的数组元素的下标，如果都不满足，则返回 -1。

---

### includes

`Array.includes(element)`, 判断数组中是否包含某一元素。

#### 参数

**element**：需要判断的是否被包含的元素。

#### 返回值

如果数组中包含`element`则返回`true`，否则返回`false`。

**includes 判断包含是严格相等判断**

```ts
const arr = [1, '2', 3];
const res1 = arr.includes(2);
const res2 = arr.includes('2');
console.log('res1', res1); // false
console.log('res2', res2); // true

const obj = {
  id: 1,
  value: 1,
};
const arrOjb = [obj];

const res3 = arrOjb.includes(obj);
const res4 = arrOjb.includes({
  id: 1,
  value: 1,
});
console.log('res3', res3); // true
console.log('res4', res4); // false
```

---

### indexOf

`Array.indexOf(element,beginIndex)`,查找第一个满足条件的元素的下标。

#### 参数

**element**：需要在类型化数组中定位的元素

**beginIndex**：搜索的起始下标。如果下标大于等于类型化数组长度，则返回 -1，意思是类型化数组不会被搜索。如果提供的下标值是负数，则被当做距离类型化数组尾部的偏移。注：如果提供的下标是负数，类型化数组仍然从前到后搜索。如果计算出来的下标小于 0，则会搜索整个类型化数组。默认为 0（搜索整个类型化数组）。

#### 返回值

数组中元素的第一个下标；没有找到则返回-1 。

---

### filter

`Array.filter(callback)` 找到满足回调函数的数组元素。

#### 参数

**canllback**：判断条件执行的函数。`(item,index,array)=>boolean`。

**item**：数组中的元素。

**index**：元素的下标。

**array**：被循环的数组。

#### 返回值

返回由满足测试函数的数组元素组成的新的数组。

### forEach

`Array.forEach(callback)`,遍历数组

#### 参数

**canllback**：判断条件执行的函数。`(item,index,array)=>void`。

**item**：数组中的元素。

**index**：元素的下标。

**array**：被循环的数组。

---

### map

`Array.map(callback)`,遍历数组并返回由回调函数返回的内容组成的新的数组

#### 参数

**canllback**：判断条件执行的函数。`(item,index,array)=>any`。

**item**：数组中的元素。

**index**：元素的下标。

**array**：被循环的数组。

#### 返回值

一个以回到函数返回值组成的新的数组

```ts
const arr: { id: number; value: number }[] = [
  {
    id: 1,
    value: 1,
  },
  {
    id: 2,
    value: 2,
  },
  {
    id: 3,
    value: 3,
  },
  {
    id: 4,
    value: 3,
  },
  {
    id: 5,
    value: 2,
  },
  {
    id: 6,
    value: 1,
  },
];

const res = arr.map(({ id, value }) => {
  if (value > 2) {
    return id;
  }
});

console.log('res', res);
// res [ undefined, undefined, 3, 4, undefined, undefined ]
```

---

### reduce

`Array.reduce(callback,initValue)`: 累加器，从左向右，返回累加后的结果。

#### 参数

**callback**：累加计算的方法，`(pre, cur, index, array)=>any`

**pre**: 上一次累加后的返回值。
**cur**：当前参与累加操作的数组元素。
**index**: 当前参与累加操作的数组元素的下标。
**array**: 当前数组。

**initValue**： 第一次循环叠加的初始值

#### 返回值

返回最终叠加后的返回值

```ts
const arr = [1, 2, 3, 4, 5];
// 初始值为3，如果数组元素大于2，则参与累加
//  3 + 3 + 4 + 5
const res = arr.reduce((pre, cur) => (cur > 2 ? pre + cur : pre), 3);

console.log('res', res);
// res 15
```

### reduceRight

`Array.reduceRight(callback,initValue)`: 累加器，从右向左，返回累加后的结果。用法和`reduce`相同

---

:::info
<b>every</b>，<b>some</b>，<b>find</b>，<b>findIndex</b>，<b>filter</b>，<b>forEach</b>，

除了第一个回调函数当参数之外，还可以传一个可以改变回调函数 this 指向的参数
:::

```js
const arr = [1, 2, 3, 4, 5, 6];

const thisArr = [7, 8, 9];

const thisRes = arr.every(function (item) {
  // this 为全局对象
  console.log('this', this);
  return item > 2;
});

const thisRes1 = arr.every(function (item) {
  // 此时this为thisArr
  console.log('this', this);
  return item > 2;
}, thisArr);
```
