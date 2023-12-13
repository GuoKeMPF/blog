/**
 * 一个无序且任何两个相邻不等的数组。求局部最小。
 * 局部最小一个
 *  1. 数均小于两侧元素的数字。
 *  2. 首位小于第二位或者最后一位小于倒数第二位。
 */

/**
 * 解：
 * 利用数学求极值点思路。
 * 1. 先判断两端是否满足条件。满足则返回
 * 2. 不满足第一条，则前面向下递减，后面向上递增。中间最少有一个最小极值
 */

const fun = arr => {
  if (arr.length === 1) {
    return 0;
  }
  if (arr[0] < arr[1]) {
    return 0;
  }
  if (arr[arr.length - 1] > arr[arr.length]) {
    return arr.length;
  }
};

const test = [6, 5, 1, 4, 2, 6, 7, 4, 8];

const result = fun(test);
console.group('result');
console.log(result);
if (result === 0) {
  console.log(test[result], test[result + 1]);
} else if (result === test.length - 1) {
  console.log(test[result - 1], test[result]);
} else {
  console.log(test[result - 1], test[result], test[result + 1]);
}
console.groupEnd();
