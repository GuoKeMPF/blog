---
title: useCallback
toc: menu
order: 8
---

# useCallback 利用 memoize 减少无效的 re-render

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。

<code src="./index.tsx" title="useCallback" ></code>
