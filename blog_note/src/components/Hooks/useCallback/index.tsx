import React, { useState, useCallback } from 'react';
import { Divider, Button } from 'antd';
import Child from './Child';

const Parent = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  const [name, setName] = useState('init');
  const changeName = (newName: string) => setName(newName);
  const changeNameCallback = useCallback(changeName, []);
  return (
    <div>
      <Button onClick={increment}>点击次数：{count}</Button>
      <Divider orientation="left">Child</Divider>
      <Child name={name} onClick={changeName} />
      <Divider orientation="left">Child with useCallback</Divider>
      <Child name={name} onClick={changeNameCallback} />
    </div>
  );
};

export default Parent;
