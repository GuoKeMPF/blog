/* eslint-disable @typescript-eslint/no-unused-vars */
type T = {
  a: string;
  b: number;
};

type T1 = Partial<T>;

// T1 需要是 T 的子集
const t1: T1 = {
  a: '123',
};

// c 不存在 T 中报错
const t2: T1 = {
  a: 'aaa',
  c: 'sss'
}

export default {}
