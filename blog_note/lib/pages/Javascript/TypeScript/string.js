"use strict";

// 创建一个字符串
const str1 = 'aaa';
// 构造方式创建一个字符串
const str2 = String('aaa');
// 创建一个字符串对象
const str3 = new String('aaaa');
console.dir(str1);
console.dir(str2);
console.dir(str3);
console.log('str1 === str2', str1 === str2);
console.log('str2 === str3', str2 === str3);
console.log('str1 === str3', str1 === str3);