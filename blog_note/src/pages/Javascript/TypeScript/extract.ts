type T = string| boolean | number
const t = [1]
type TE = string | Array<number> | number

type TEX = Extract<T, TE>

const tex1: TEX = 'ss'
const tex4: TEX = 2
const tex5: TEX = []
const tex3: TEX = true

interface A {
  a: string;
  b: boolean;
}


interface B extends A {
  c:Array<number>
}

type C  = Extract<B, A>

const c: C = {
  a: 'ss',
  c: [],
  b: false
}


export default {}




