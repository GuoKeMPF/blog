import { Button } from 'antd';
import React, { useLayoutEffect, useState } from 'react';

export const LayoutEffect = () => {
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    console.log('useLayoutEffect executed');
    document.title = `Count (useLayoutEffect): ${count}`;
    console.log(document.title);
  }, [count]);

  return (
    <div>
      <p>Count (useLayoutEffect): {count}</p>{' '}
      <Button onClick={() => setCount(count + 1)}>Increment{count}</Button>
    </div>
  );
};
