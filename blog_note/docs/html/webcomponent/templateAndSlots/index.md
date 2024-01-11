---
title: templates slots
order: 2
---



# templates and slots

当必须在网页上重复使用相同的标记结构时，可以使用模板和插槽而不是重复的构造元素。以前这是可行的，但 HTML `<template>` 元素使它更容易实现。此元素及其内容不会在 DOM 中呈现，但仍可使用 JavaScript 去引用它。`<slots>` 可以使插入的内容更灵活。

<code src='./index.tsx'></code>
