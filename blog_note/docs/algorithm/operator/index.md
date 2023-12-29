# js 运算符

## 主要表达式

JavaScript 中基本关键字和常用表达式。

|                  |                                                                 |
| :--------------- | :-------------------------------------------------------------- |
| `this`           | 关键字指向函数的执行上下文                                      |
| `function`       | 关键字定义了函数表达式。                                        |
| `class`          | 关键字定义了类表达式。                                          |
| `function*`      | 关键字定义了一个 generator 函数表达式。                         |
| `yield`          | 暂停和恢复 generator 函数。                                     |
| `yield*`         | 委派给另外一个 generator 函数或可迭代的对象。                   |
| `async function` | 定义一个异步函数表达式。                                        |
| `await`          | 暂停或恢复执行异步函数，并等待 promise 的 resolve/reject 回调。 |
| `[]`             | 数组初始化/字面量语法。                                         |
| `{ }`            | 对象初始化/字面量语法。                                         |
| `/ab+c/i`        | 正则表达式字面量语法。                                          |
| `( )`            | 分组操作符。                                                    |

## 左表达式

左边的值是赋值的目标。

|              |                                                                                                         |
| :----------- | :------------------------------------------------------------------------------------------------------ |
| 属性访问符   | 成员运算符提供了对对象的属性或方法的访问。(object.property 和 object["property"]).                      |
| `new`        | 运算符创建了构造函数实例。                                                                              |
| `new.target` | 在构造器中，new.target 指向 new 调用的构造器。                                                          |
| `super`      | 关键字调用父类的构造器。                                                                                |
| `...obj`     | 展开运算符可以将一个可迭代的对象在函数调用的位置展开成为多个参数,或者在数组字面量中展开成多个数组元素。 |

## 自增和自减

前置/后置自增运算符和前置/后置自减运算符。

|       |                  |                |
| :---- | :--------------- | :------------- |
| `a++` | 后置自增运算符。 | a++ a=a; a=a+1 |
| `a--` | 后置自减运算符。 |                |
| `++a` | 前置自增运算符。 |                |
| `--a` | 前置自减运算符。 |                |

```js
// 后置自增运算符
let a = 1;
const b = a++;
// let a = 1;
// const b = a;
// a = a + 1;
// a = 2;
// b = 1;

// 前置自增运算符。
let c = 1;
const d = ++c;
// let c = 1;
// c = c + 1;
// const d = c;
// c = 2;
// d = 2;

let e = 5;
const f = e++ + ++e;
// const f = (e++) + (++e);
// f = 5 + (++e);
// e = e + 1;  => e = 6;
// f = 5 + (++e);
// f = 5 + (6 + 1); => 5 + 7;
// e = e + 1 => 6 + 1; => 7;
```

## 一元运算符

一元运算符只有一个操作数.

|          |                                              |
| :------- | :------------------------------------------- |
| `delete` | 运算符用来删除对象的属性。                   |
| `void`   | 运算符表示表达式放弃返回值。                 |
| `typeof` | 运算符用来判断给定对象的类型。               |
| `+`      | 一元加运算符将操作转换为 Number 类型。       |
| `-`      | 一元减运算符将操作转换为 Number 类型并取反。 |
| `!`      | 逻辑非运算符。                               |

## 算术运算符

算术运算符以二个数值（字面量或变量）作为操作数，并返回单个数值。

|     |              |
| :-- | :----------- |
| `+` | 加法运算符。 |
| `-` | 减法运算符。 |
| `/` | 除法运算符。 |
| `*` | 乘法运算符。 |
| `%` | 取模运算符。 |

## 关系运算符

比较运算符比较二个操作数并返回基于比较结果的 Boolean 值。

|              |                                            |
| :----------- | :----------------------------------------- |
| `in`         | 运算符用来判断对象是否拥有给定属性。       |
| `instanceof` | 运算符判断一个对象是否是另一个对象的实例。 |
| `<`          | 小于运算符。                               |
| `>`          | 大于运算符。                               |
| `<=`         | 小于等于运算符。                           |
| `>=`         | 大于等于运算符。                           |

## 相等运算符

如果相等，操作符返回的是布尔类型的 true，否则是 false。

|       |                |
| :---- | :------------- |
| `==`  | 相等 运算符.   |
| `!=`  | 不等 运算符.   |
| `===` | 全等 运算符.   |
| `!==` | 非全等 运算符. |

## 位移运算符

在二进制的基础上对数字进行移动操作

|       |                        |
| :---- | :--------------------- |
| `<<`  | 按位左移运算符。       |
| `>>`  | 按位右移运算符。       |
| `>>>` | 按位无符号右移运算符。 |

```js
const a = 7;
// 乘2的3次方
const b = a << 3;
// 7 * 2 ^ 3
// 除2的一次方取证
const c = a >> 1;
// 7 / ( 2 ^ 1 )
```

## 二进制位运算符

二进制运算符将它们的操作数作为 32 个二进制位（0 或 1）的集合，并返回标准的 JavaScript 数值。

|      |                       |
| :--- | :-------------------- |
| `&`  | 二进制位与（AND）。   |
| `\|` | 二进制位或（OR）。    |
| `^`  | 二进制位异或（XOR）。 |
| `~`  | 按位非运算符。        |

:::warning

<p> 按位非运算时，任何数字 x 的运算结果都是-(x + 1)。例如，〜-5 运算结果为 4。</p>
<p> 符号位不变，将剩余位取反，得到反码，在反码的基础上最后一位加一得到负数的补码。</p>
:::

```js
const a = 4;
const b = 5;
const c = a & b;
const d = a | b;
const e = a ^ b;
console.log(c, d, e); // c = 4, d = 5, e = 1,
// a = 4 ; a => 4 => 0b100
// b = 7 ; b => 7 => 0b101
// c = a & b
// 0b100
// 0b101
// ------
// 0b100
// c = 0b100; c => 0b100 => 4

// d = a | b;
// 0b100
// 0b101
// ------
// 0b101
// d = 0b101; d => 0b101 => 5

// e = a ^ b;
// 0b100
// 0b101
// ------
// 0b001
// e = 0b001; e => 0b001 => 1
```

```js
const ba = 5;
const bb = ~ba; // -6
// 十进制5的二进制表示为:
// ba = 5 => 5 => 0b 0000 0101
// 0b 0000 0101
// 每位都取反:
// 0b 1111 1010
// 1.符号位不变，剩余位取反
// 0b 1000 0101
// 2.最后一位加1
// 0b 1000,0110
// 3.二进制 0b 1000 0110 十进制表示为 -6
```

## 二元逻辑运算符

逻辑运算符典型的用法是用于布尔(逻辑)值运算, 它们返回布尔值。

|        |                                                                  |
| :----- | :--------------------------------------------------------------- |
| `&&`   | 逻辑与。                                                         |
| `\|\|` | 逻辑或。                                                         |
| `??`   | 空值合并运算符，如果 ?? 前面是 null 或 undefined，取后面的默认值 |

```js
var a;
const b = 0;

const c = a || 'c';
const d = b || 'd';

const e = a ?? 'e';
const f = b ?? 'f';

console.log(c, d, e, f); // c d e 0
```

## 条件(三元)运算符

|                              |                                                          |
| :--------------------------- | :------------------------------------------------------- |
| condition ? ifTrue : ifFalse | 条件元素运算符把两个结果中其中一个符合运算逻辑的值返回。 |

## 赋值运算符

赋值元素符会将右边的操作数的值分配给左边的操作数，并将其值修改为右边操作数相等的值。

|                       |                                                                                                    |
| :-------------------- | :------------------------------------------------------------------------------------------------- |
| `=`                   | 赋值运算符。                                                                                       |
| `*=`                  | 赋值乘积。                                                                                         |
| `/=`                  | 赋值商。                                                                                           |
| `%=`                  | 赋值求余。                                                                                         |
| `+=`                  | 赋值求和。                                                                                         |
| `-=`                  | 赋值求差。                                                                                         |
| `<<=`                 | 左位移。                                                                                           |
| `>>=`                 | 右位移。                                                                                           |
| `>>>=`                | 无符号右位移。                                                                                     |
| `&=`                  | 赋值与。                                                                                           |
| `^=`                  | 赋值按位异或。                                                                                     |
| `=`                   | 赋值或。                                                                                           |
| `&&=`                 | 逻辑和赋值运算符。                                                                                 |
| `=`                   | 逻辑或赋值运算符。                                                                                 |
| `??=`                 | 逻辑空赋值运算,逻辑空赋值运算符 (x ??= y) **仅在 x 是 `nullish (null 或 undefined)`** 时对其赋值。 |
| `[a, b] = [1, 2]`     | 解构赋值允许你分配数组或者对象变量的属性通过使用规定的语法，其看起来和数组和对象字面量很相似。     |
| `{a, b} = {a:1, b:2}` | 解构赋值允许你分配数组或者对象变量的属性通过使用规定的语法，其看起来和数组和对象字面量很相似。     |

## 逗号操作符

|     |                                                                                      |
| :-- | :----------------------------------------------------------------------------------- |
| `,` | 逗号操作符允许在一个判断状态中有多个表达式去进行运算并且最后返回最后一个表达式的值。 |

## 其它

|      |              |
| :--- | :----------- |
| `?`. | 可选链操作符 |

**?.** 短路计算

1. 当在表达式中使用可选链时，如果左操作数是 null 或 undefined，表达式将不会被计算

```js
let potentiallyNullObj = null;
let x = 0;
let prop = potentiallyNullObj?.[x++];

console.log(x); // x 将不会被递增，依旧输出 0
```

2. 可以连续使用可选链读取多层嵌套结构：

```js
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah',
  },
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// expected output: undefined

console.log(adventurer.someNonExistentMethod?.());
// expected output: undefined
```

3. 使用空值合并操作符, 空值合并操作符可以在使用可选链时设置一个默认值：

```js
let customer = {
  name: 'Carl',
  details: { age: 82 },
};
let customerCity = customer?.city ?? '暗之城';
console.log(customerCity); // “暗之城”
```

:::warning{title='?? 和 || 区别'}

|| 不能区分 false， 0， '' 和 null undefined。

?? 只有左边为 null undefined 时，才会返回右边的值。

:::

```js
const x = 0;
console.log(x || 'default'); // default
console.log(x ?? 'default'); // 0
```