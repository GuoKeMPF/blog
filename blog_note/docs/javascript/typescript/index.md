# TypeScript

TypeScript 是微软开发的一个开源的编程语言，通过在 JavaScript 的基础上添加静态类型定义构建而成。TypeScript 通过 TypeScript 编译器或 Babel 转译为 JavaScript 代码，可运行在任何浏览器，任何操作系统。

## TypeScript 类型声明

### 直接使用类型

```typescript
// 创建一个字符串
const str1: string = 'aaa';
// 构造方式创建一个字符串
const str2: String = String('aaa');
// 创建一个字符串对象
const str3: String = new String('aaaa');

console.dir(str1);
console.dir(str2);
console.dir(str3);

console.log('str1 === str2', str1 === str2);
console.log('str2 === str3', str2 === str3);
console.log('str1 === str3', str1 === str3);

// out put
// 'aaa'
// 'aaa'
// [String: 'aaaa']
// str1 === str2 true
// str2 === str3 false
// str1 === str3 false
```

### 数组声明方式

除了声明变量本身是个数组外，还要对数组元素类型进行声明。

```ts
const array1: string[] = ['1', '2'];
const array2: (string | number)[] = ['1', 2];
const array3: any[] = ['1', 2, true, null, undefined, { a: 'aaa' }, [1, 2, 3]];

const arr1 = new Array<number>(1, 2, 3);
const arr2 = new Array<number | string>(1, '2', 3);
const arr3 = new Array<any>(
  '1',
  2,
  true,
  null,
  undefined,
  { a: 'aaa' },
  [1, 2, 3],
);
```

### 对象声明

```ts
type Person = {
  name: string;
  age: number;
  sex: '男' | '女';
  say: (word: string) => void;
};

const xiaoming: Person = {
  name: '小明',
  age: 18,
  sex: '女',
  say: function (p) {
    console.log(`${this.name} say ${p}`);
    return `${this.name} say ${p}`;
  },
};

type Student = {
  school: string;
  className: string;
};

const class1: Student = {
  school: '一中',
  className: '三年级二班',
};

// student_xiaoming 既有 Person 的属性，也有 Student 属性
const student_xiaoming: Student & Person = {
  ...xiaoming,
  ...class1,
};
```

### 函数声明

普通函数

```ts
// 无入参 无返回
const fun1: () => void = () => {
  console.log('sss');
};

// 有入参 无返回
const fun2: (arr: number[]) => void = (arr) => {
  console.log(arr.reduce((pre, cur) => pre + cur, 0));
};

// 有入参 有返回
const fun3: (arr: number[]) => number = (arr) => {
  return arr.reduce((pre, cur) => pre + cur, 0);
};
```

promise

```ts
type ProResType = {
  token: string;
  id: 111;
};
type PrRejType = {
  message: string;
};

const p1 = new Promise<ProResType | PrRejType>(
  (resolve: (res: ProResType) => void, reject: (rej: PrRejType) => void) => {
    // to something
    resolve({
      id: 111,
      token: 'sss',
    });
    // or
    // reject({
    //   message: 'error',
    // });
  },
);
```

### type 和 interface

1. `type` 的类型别名可以用于其他的类型，比如 联合类型、元组类型、基本类型，`interface` 不行

```ts
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
```

2. `type` 的别名不可以多次定义会报错，而 `interface` 则可以多次定义，会将其视为合并到一起。

```ts
interface A {
  a: string;
  b: boolean;
}

// 之后声明的属性不能和之前的重复
interface A {
  c: Array<number>;
  //   a: number;        // 提示 a 属性已经被声明过
}
const a: A = {
  a: '',
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
```

3. `type` 能用 `in` 关键字，而 `interface` 不行。

```ts
type Keys = 'name' | 'age';

type Man = {
  [key in Keys]: string;
};

const man: Man = {
  name: 'aa',
  age: '18',
};
```

4. 默认导出的方式不同，`inerface` 支持同时声明，默认导出，而 `type` 必须先声明后导出

```ts
export default interface C1 {
  name: string;
}

type C2 = {
  name: string;
};
export default C2;
```

5. 拓展方式不一样

`interface` 用 `extends` 拓展 `type` 用 `&` 来拓展

```ts
interface D {
  d: string;
}

interface D1 extends D {
  e: string;
}

const d1: D1 = {
  d: '',
  e: '',
};

type T = {
  d: string;
};

type T1 = T & {
  e: string;
};

const t1: T1 = {
  d: '',
  e: '',
};
```

### Omit 剔除类型中某些项

`type Omit<T, K extends string | number | symbol>`

T: 从 T 中删除属性

K: 被剔除的键值

```ts
interface A {
  a: string;
  b: boolean;
  c: Array<number>;
}

type AO = Omit<A, 'a'>;
// interface AO {
//   b: boolean;
//   c: Array<number>;
// }

const ao: AO = {
  b: true,
  c: [],
};

type AOS = Omit<A, 'a' | 'c'>;
// 属性 a , c被 omit 操作剔除
// interface AOS {
//   b: boolean;
// }
const aos: AOS = {
  c: [],
};
```

### Pick 选取类型中指定类型

`type Pick<T, K extends string | number | symbol>`

T: 从 T 保留属性

K: 被保留的键值

```ts
interface A {
  a: string;
  b: boolean;
  c: Array<number>;
}

type AP = Pick<A, 'a'>;
// interface AO {
//   a: string;
// }

const ap: AP = {
  a: '',
};

type APS = Pick<A, 'a' | 'c'>;
// 属性 a , c被 omit 操作剔除
// interface AOS {
//   b: boolean;
//   c: Array<number>;
// }
const aps: APS = {
  a: '',
  c: [],
};
```

### Exclude

```ts
type Exclude<T, U> = T extends U ? never : T;
```

作用：如果 T 是 U 的子类型则返回 never 不是则返回 T

```ts
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
```

### Extract

```ts
type T = string | boolean | number;
const t = [1];
type TE = string | Array<number> | number;

type TEX = Extract<T, TE>; // string | number

const tex1: TEX = 'ss';
const tex4: TEX = 2;

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
```
