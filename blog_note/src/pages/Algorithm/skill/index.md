---
toc: menu
title: 运算技巧
---

# 运算技巧

## 异或交换值

优点：可以不额外申请储存空间

缺点：只使用整数

```js
let a = 9;
let b = 50;

a = a ^ b;
b = a ^ b;
a = a ^ b;
console.log(a, b); // 50 9
```

```js
let a = 9.5;
let b = 50;

a = a ^ b;
b = a ^ b;
a = a ^ b;
console.log(a, b); // 50 9
```

## 平均数

优点：在两个数都在计算机精度范围内计算的平均数不超出计算机的精度

例如：js 中的 `Number.MAX_SAFE_INTEGER` （ 2^53 -1 ） 超出这个数的计算将不能保证准确性。

```js
const a = 9,
  b = 16;

const average = a + (b - a) / 2;
console.log(average);
```

```js
const a = 9,
  b = 16,
  c = 30;

const average = a + (b - a) / 3 + (c - a) / 3;
console.log(average);
```

## 深拷贝

由于对象属于引用数据类型，单纯把一个值赋值赋值给另外一个变量会导致修改对象属性的时候将另外一个变量属性也给改掉了。这种拷贝也叫做浅拷贝。

```js
const object = {
  num: 11111,
  str: 'string',
  arr: [1, 2, 3],
  undif: undefined,
  boolean: true,
  reg: /asdf/,
  a: 'AA',
  fun: function() {
    console.log('function');
  },
  obj: {
    a: 'aa',
    b: 'bb',
    c: {
      d: 'dd',
    },
  },
};
object.obj.self = object.obj;

const ifObject = data => data === null || !(typeof data === 'object');
```

1. JSON

```js
const jsonCopy = obj => JSON.parse(JSON.stringify(obj));
```

2. 递归

```js
const deepCopy = data => {
  let dataTmp = undefined;
  if (ifObject(data))) {
    dataTmp = data;
  } else {
    dataTmp = data.constructor.name === 'Array' ? [] : {};
    for (let key in data) {
      dataTmp[key] = deepCopy(data[key]);
    }
  }
  return dataTmp;
};
```
