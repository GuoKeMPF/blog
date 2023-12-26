---
title: Hooks
order: 0
---

# Hooks

Hook 是 React 16.8 的新增特性。它可以让你在不编写 **class** 的情况下使用 state 以及其他的 React 特性。（函数组件也可以在实现 class 组建的效果）

**Hook** 是一个特殊的函数，它可以让你“钩入” React 的特性。
例如，useState 是允许你在 React 函数组件中添加 state 的 Hook。

如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须将其转化为 class。现在你可以在现有的函数组件中使用 Hook。

```jsx | pure
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

效果上等价与

```jsx  | pure
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```
