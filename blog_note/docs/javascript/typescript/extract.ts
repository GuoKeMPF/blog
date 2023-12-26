/* eslint-disable @typescript-eslint/no-unused-vars */
type T = string | boolean | number;
const t = [1];
type TE = string | Array<number> | number;

type TEX = Extract<T, TE>;

const tex1: TEX = 'ss';
const tex4: TEX = 2;
const tex5: TEX = [];
const tex3: TEX = true;

interface A {
  a: string;
  b: boolean;
}

interface B extends A {
  c: Array<number>;
}

type C = Extract<B, A>;

const c: C = {
  a: 'ss',
  c: [],
  b: false,
};

type Fans = {
  song: string;
};
interface SuperFan {
  song: string;
  dance: string;
}

type IFan = Exclude<SuperFan, Fans>;

// SuperFan not extends form Fans, finaly IFan is never
const ifan: IFan = {
  song: '123',
};

export default {};
