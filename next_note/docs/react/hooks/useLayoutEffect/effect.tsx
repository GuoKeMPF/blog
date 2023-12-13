import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

export const Effect = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('useEffect executed');
    document.title = `Count (useEffect): ${count}`;
    console.log(document.title);
  }, [count]);

  return (
    <div>
      <p>Count (useEffect): {count}</p>
      <Button onClick={() => setCount(count + 1)}>Increment{count}</Button>
    </div>
  );
};
