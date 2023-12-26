import { Alert, Button, Divider } from 'antd';
import React, { useState } from 'react';
import Child from './Child';

const Parent = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  const [name, setName] = useState('init');
  const changeName = (newName: string) => setName(newName);
  return (
    <div>
      <Alert
        message="function changeName without useCallback will re-render Child"
        type="warning"
      />
      <Button onClick={increment}>点击次数：{count}</Button>
      <Divider orientation="left">Child</Divider>
      <Child from='WithoutCallback'  name={name} onClick={changeName} />
    </div>
  );
};

export default Parent;
