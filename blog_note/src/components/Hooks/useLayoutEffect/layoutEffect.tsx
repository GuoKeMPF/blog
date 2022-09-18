import React, { useState, useLayoutEffect } from 'react';
import { Button } from 'antd';

export const LayoutEffect = () => {
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    if (count === 0) {
      for (let i = 0; i < 50000; i++) {}
      setCount(Math.floor(Math.random() * 200));
    }
  }, [count]);

  return <Button onClick={() => setCount(0)}>{count}</Button>;
};
