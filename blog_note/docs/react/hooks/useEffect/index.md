---
title: useEffect
toc: menu
order: 2
---

# useEffect 函数组件中执行副作用操作

在 `class` 组件中，我们通过 `componentDidMount`,`componentDidUpdate`,`componentWillUnmount` 和一些其他生命周期函数， 在 react 各个周期状态去执行想要的操作

```jsx | pure
import React, { Component, Fragment } from 'react';
import { Button } from 'antd';

interface StateType {
  count: number;
}
interface PropsType {}

class LifeCycle extends Component<any, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {
    console.log('mount');
  }

  componentDidUpdate(preProps: PropsType, PreState: StateType) {
    console.log('update');
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  addCount = () => {
    const { count } = this.state;
    this.setState({
      count: count + 1,
    });
  };

  render() {
    const { addCount, state } = this;
    const { count } = state;
    return (
      <Fragment>
        <p>count: {count}</p>
        <Button onClick={addCount}>count + 1</Button>
      </Fragment>
    );
  }
}
export default LifeCycle;
```

```jsx | pure
import React, { useState, useEffect, Fragment } from 'react';
import { Button } from 'antd';
export const Effect = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`componentDidMount`);
  }, []);

  useEffect(() => {
    console.log(`componentDidUpdate`);
  });

  useEffect();
};
import React, { useState, useEffect, Fragment } from 'react';
import { Button } from 'antd';
export const Effect = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`componentDidMount`);
  }, []);

  useEffect(() => {
    console.log(`componentDidUpdate`);
  });

  useEffect(
    () => () => {
      console.log('useEffect:componentWillUnmount');
    },
    [],
  );

  const addCount = () => {
    setCount(count + 1);
  };

  return (
    <Fragment>
      <p>count: {count}</p>
      <Button onClick={addCount}>count + 1</Button>
    </Fragment>
  );
};
```

<code src="./index.tsx" title="useEffect" ></code>
