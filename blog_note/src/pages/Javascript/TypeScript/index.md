---
title: TypeScript
toc: menu
---

# TypeScript

TypeScript 是微软开发的一个开源的编程语言，通过在 JavaScript 的基础上添加静态类型定义构建而成。TypeScript 通过 TypeScript 编译器或 Babel 转译为 JavaScript 代码，可运行在任何浏览器，任何操作系统。

## TypeScript 类型声明

1. 直接使用类型

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
