import React, { useState, Fragment } from 'react';
import { Button, Space } from 'antd';

const useStateConponent = () => {
  const [count, setCount] = useState<number>(() => 0);

  const add = () => {
    setCount(count + 1);
  };
  const reduce = () => {
    setCount(count - 1);
  };
  return (
    <Fragment>
      <Space>
        <Button onClick={add}>count + 1</Button>
        <Button onClick={reduce}>count - 1</Button>
      </Space>
      <p>count: {count}</p>
    </Fragment>
  );
};

export default useStateConponent;
