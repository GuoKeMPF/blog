"use strict";

const a = {
  a: "",
  b: true,
  c: []
};
const ao = {
  a: "",
  // a 属性被 omit 操作剔除
  b: true,
  c: []
};
// 属性 a , c被 omit 操作剔除
const aos = {
  //   a: "",
  b: true,
  c: []
};

// 只从A中选中 a 属性

// b c 会报错
const ap = {
  a: ""
};
// b 会报错
const aps = {
  a: "",
  c: []
};