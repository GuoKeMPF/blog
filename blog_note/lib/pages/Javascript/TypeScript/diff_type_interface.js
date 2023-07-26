"use strict";

// type 的类型别名可以用于其他的类型，比如 联合类型、元组类型、基本类型，interface 不行

// 联合类型

// 元组类型

// 基本类型

// type 的别名不可以多次定义会报错，而 interface 则可以多次定义，会将其视为合并到一起。

const a = {
  a: "",
  b: true,
  c: []
};
const man = {
  name: "aa",
  age: "18"
};

// 默认导出的方式不同，inerface 支持同时声明，默认导出，而type必须先声明后导出

// export default interface C1 {
//   name: string;
// }

// type C2 = {
//   name: string;
// };
// export default C2;

// 拓展方式不一样
// interface 用 extends 拓展
// type 用 & 来拓展

const d1 = {
  d: "",
  e: ""
};
const t1 = {
  d: "",
  e: ""
};
const to = {
  d: ""
};