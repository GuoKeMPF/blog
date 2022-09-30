---
title: TypeScript
toc: menu
---

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

<Alert type="info">
  数据类型小写和首字母大写代表不同类型，分别表示字面量和构造方式的数据。
</Alert>

### 数组声明方式

除了声明变量本身是个数组外，还要对数组元素类型进行声明。

```ts
const array1: string[] = ['1', '2'];
const array2: (string | number)[] = ['1', 2];
const array3: any[] = ['1', 2, true, null, undefined, { a: 'aaa' }, [1, 2, 3]];

const arr1 = new Array<number>(1, 2, 3);
const arr2 = new Array<number | string>(1, '2', 3);
const arr3 = new Array<any>('1', 2, true, null, undefined, { a: 'aaa' }, [
  1,
  2,
  3,
]);
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
  say: function(p) {
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
const fun2: (arr: number[]) => void = arr => {
  console.log(arr.reduce((pre, cur) => pre + cur, 0));
};

// 有入参 有返回
const fun3: (arr: number[]) => number = arr => {
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
