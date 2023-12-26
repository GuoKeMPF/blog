/* eslint-disable @typescript-eslint/no-unused-vars */
type T = string | boolean | number;
const t = [1];
type TE = string | Array<number> | number;

type TEC = Exclude<T, TE>;

const tex1: TEC = 'ss';
const tex4: TEC = 2;
const tex5: TEC = [];
const tex3: TEC = true;

interface A {
  a: string;
  b: boolean;
}

interface B {
  c: Array<number>;
  d: number;
}

type C = Exclude<B, A>;

const c: C = {
  d: 1,
  c: [],
};

type Fans = {
  song: string;
};

interface SuperFan extends Fans {
  dance: string;
}

type IFan = Exclude<SuperFan, Fans>;

// SuperFan extends form Fans, finaly IFan is never
const ifan: IFan = {
  song: '123',
};

export default {};
