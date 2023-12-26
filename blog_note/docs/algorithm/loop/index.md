---
toc: menu
title: 循环
---

# 循环

## for

```js
/**
 * for (语句 1; 语句 2; 语句 3)
 * {
 *      被执行的代码块
 *  }
 * 语句 1 （代码块）开始前执行
 * 语句 2 定义运行循环（代码块）的条件
 * 语句 3 在循环（代码块）已被执行之后执行
 * 语句1，语句3 可以为空，但是需要定义 语句2 终止循环的操作
 */
for (let index = 0; index < list.length; index++) {
  const element = list[index];
  console.log(element);
}
```

## while

```js
/**
 * while (条件)
 * {
 *     需要执行的代码
 * }
 */
while (index < list.length) {
  const element = list[index];
  index++;
}
```

## do while

do/while 循环是 while 循环的变体。该循环会在检查条件是否为真之前执行一次代码块，然后如果条件为真的话，就会重复这个循环。

```js
do {
  const element = list[index];
  console.log(element);
  index++;
} while (index < list.length);
```

## 备注

1. do while 和 while 区别

while 是先判断是否满足条件，再去执行

do while 是先执行一次，再看是否满足下一次循环的条件是否满足

```js
const arr = [1, 2, 3, 4, 5, 6];
function loopWhile(list) {
  let index = 0;
  const res = [];
  while (index < 0) {
    const element = list[index];
    res.push(element);
    index++;
  }
  return res;
}

function loopDoWhile(list) {
  let index = 0;
  const res = [];
  do {
    const element = list[index];
    res.push(element);
    index++;
  } while (index < 0);
  return res;
}

loopWhile(arr); // []
loopDoWhile(arr); // [1]
```

2. for 和 for in 区别

for in 会遍历 一个可遍历对象的所有属性 即 key value 形式的所有键值对

for 只会遍历数组上的值

```js
const arr = [1, 2, 3, 4, 5, 6];

arr['id'] = 'arr';
arr[6] = 7;
arr['7'] = 8;

for (let index = 0; index < arr.length; index++) {
  const element = arr[index];
  console.log(element);
  // 1,2,3,4,5,6,7,8,
}

for (const key in arr) {
  console.log(arr[key]);
  // 1,2,3,4,5,6,7,8,'arr'
}
```

## break continue return 的区别


**break** 跳出循环本身，不会影响循环之外的函数的执行。


**continue** 跳出本次循环，进入到下一次循环直至结束。


**return** 跳出函数，并返回 return 的值。




```js
const loopBreak = function(array) {
  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    if (value === 3) {
      break;
    }
    console.log(value);
  }
  console.log('finish break loop');
};

const loopContinue = function(array) {
  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    if (value === 3) {
      continue;
    }
    console.log(value);
  }
  console.log('finish continue loop');
};

const loopReturn = function(array) {
  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    if (value === 3) {
      return;
    }
    console.log(value);
  }
  console.log('finish return loop');
};

const arr = [1, 2, 3, 4, 5, 6]

loopBreak(arr);
// 1 2 'finish break loop'


loopContinue(arr);
// 1 2 4 5 6 finish continue loop


loopReturn(arr);
// 1 2
```
