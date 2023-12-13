type T = string| boolean | number
const t = [1]
type TE = string | Array<number> | number

type TEC = Exclude<T, TE>

const tex1: TEC = 'ss'
const tex4: TEC = 2
const tex5: TEC = []
const tex3: TEC = true

interface A {
  a: string;
  b: boolean;
}


interface B {
  c: Array<number>,
  d: number
}

type C  = Exclude<B, A>

const c: C = {
  d: 1,
  c: [],
}


export default {}
