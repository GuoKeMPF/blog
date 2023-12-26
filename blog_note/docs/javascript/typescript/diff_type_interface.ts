// type 的类型别名可以用于其他的类型，比如 联合类型、元组类型、基本类型，interface 不行

type TestA = {
  x: number;
};

type TestB = {
  y: number;
};
// 联合类型
type Union = TestA | TestB;
// 元组类型
type Enum = [TestA, TestB];
// 基本类型
type Base = Number;

// type 的别名不可以多次定义会报错，而 interface 则可以多次定义，会将其视为合并到一起。
interface A {
  a: string;
  b: boolean;
}

interface A {
  c: Array<number>;
  //   a: number;        // 提示 a 属性已经被声明过
}

const a: A = {
  a: "",
  b: true,
  c: [],
};

type B = {
  a: string;
  b: boolean;
};
// //  提示 B 已经被定义
// type B = {
//   c: Array<number>;
// };

// type 能用 in 关键字，而interface不行。

type Keys = "name" | "age";

type Man = {
  [key in Keys]: string;
};

const man: Man = {
  name: "aa",
  age: "18",
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

interface D {
  d: string;
}

interface D1 extends D {
  e: string;
}

const d1: D1 = {
  d: "",
  e: "",
};

type T = {
  d: string;
};

type T1 = T & {
  e: string;
};

const t1: T1 = {
  d: "",
  e: "",
};

type TO = Omit<T1, "e">;

const to: TO = {
  d: "",
};
