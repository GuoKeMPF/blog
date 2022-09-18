---
toc: menu
title: 复杂度
---

# 复杂度

## 时间复杂度

#### 常数时间的操作

一个操作，如果和样本的数据量没有关系，每次操作都是在固定时间内完成的操作，叫做**常数操作**

```js | pure
var a = 1,
  b = 2,
  c = a + b;

// 虽然数组有很多项， 但是由于数组为有序，所以操作时间为常熟。
var arr = [1, 2, 3, 4];
var d = arr[1] + arr[2];
```

常见常数时间的操作

- 常见的算数运算（+，-，\*，/，%等）
- 常见的位运算（>>,<<, | , & ,^）
- 赋值，比较，自增，自减
- 数组寻址操作

### 时间复杂度

**时间复杂度为**在一个算法流程中，常熟操作为一个指标，常用 O（读作 big o）来表示。具体来说， 先要对一个算法流程非常熟悉，然后写出这个算法流程中， 发生了多少常数操作，进而总结出常数操作数量的表达式。

### 时间复杂度求法

在表达式中，只要高阶项，不要低阶项，也不要高级项系数剩下的部分如果为 f(n)， 那么时间复杂度为 O(f(n))。多种情况取最差。

    例如， 插入排序，最差O(n^2)，最优O(n)， 取O(n^2)。

1. 选择排序

   每次循环找到最小的放到最前面
   时间复杂度 O(n^2)

2. 冒泡排序

   每次比较相邻的两个元素的大小，判断是否需要交换位置。
   时间复杂度 O(n^2)

3. 插入排序

   每次取该元素和前面比较是否有序，判断是否需要交换位置。
   时间复杂度 O(n^2)

## 空间复杂度

空间复杂度是对一个算法在运算过程中，临时占用存储空间大小的量度，输入参数，输出结果不计。求法类似时间复杂度。