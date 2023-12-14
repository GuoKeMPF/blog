---
title: useState
toc: menu
order: 1
---

# useState 组建状态以及更新

在 class 中，我们通过在构造函数中设置 this.state 为 `{ count: 0 }` 来初始化 count state 为 0：

```jsx | pure
import React, { Component } from 'react';
class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    const { count } = this.sate;
    return <p>{count}</p>;
  }
}
```

在函数组件中，我们没有 this，所以我们不能分配或读取 this.state。我们直接在组件中调用 useState Hook：

```jsx | pure
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return <p>{count}</p>;
}
```

调用 useState 它定义一个 `state 变量`。我们的变量叫 count 。这是一种在函数调用时保存变量的方式 —— useState 是一种新方法，它与 class 里面的 this.state 提供的功能完全相同。一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。

useState() 方法里面唯一的参数就是初始 state。不同于 class 的是，我们可以按照需要使用数字或字符串对其进行赋值，而不一定是对象。在示例中，只需使用数字来记录用户点击次数，所以我们传了 0 作为变量的初始 state。如果我们想要在 state 中存储两个不同的变量，只需调用 useState() 两次即可。

---

:::info
useState() 方法里面的参数初始 state
也可以通过函数返回值的形式确认初始值，在需要通过 props
确认初始值的场景下可以参考使用
:::

```jsx | pure
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(() => {
    // do something to initialize state
    return 0;
  });

  return <p>{count}</p>;
}
```

---

useState 返回值为：当前 state 以及更新 state 的函数组成的一个数组。这就是我们写 const [count, setCount] = useState() 的原因。这与 class 里面 this.state.count 和 this.setState 类似，唯一区别就是你需要成对的获取它们。

<code src="./index.tsx" title="useState" ></code>
