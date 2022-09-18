import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

export const Effect = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) {
      for (let i = 0; i < 50000; i++) {}
      setCount(Math.floor(Math.random() * 200));
    }
  }, [count]);

  return <Button onClick={() => setCount(0)}>{count}</Button>;
};
