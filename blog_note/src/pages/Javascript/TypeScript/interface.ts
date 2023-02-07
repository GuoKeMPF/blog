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

type AO = Omit<A, "a">;

const ao: AO = {
  a: "", // a 属性被 omit 操作剔除
  b: true,
  c: [],
};

type AOS = Omit<A, "a" | "c">;
// 属性 a , c被 omit 操作剔除
const aos: AOS = {
  //   a: "",
  b: true,
  c: [],
};

// 只从A中选中 a 属性
type AP = Pick<A, "a">;
// b c 会报错
const ap: AP = {
  a: "",
};

type APS = Pick<A, "a" | "c">;
// b 会报错
const aps: APS = {
  a: "",
  c: [],
};
