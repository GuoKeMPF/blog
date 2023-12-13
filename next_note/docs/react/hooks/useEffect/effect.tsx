import { Button, Space } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';

interface PropsType {
  value: number;
}

export const Effect = (props: PropsType) => {
  const { value } = props;
  const [key, setKey] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.group('useEffect:componentDidMount');
    console.log(`count:${count}`);
    console.log(`key:${key}`);
    console.log(`value:${value}`);
    console.groupEnd();
  }, []);

  useEffect(() => {
    console.group('useEffect:componentDidUpdate');
    console.log(`count:${count}`);
    console.log(`key:${key}`);
    console.log(`value:${value}`);
    console.groupEnd();
  });

  useEffect(() => {
    console.group('useEffect:componentDidUpdate');
    console.log(`count:${count}`);
    console.log(`key:${key}`);
    console.log(`value:${value}`);
    console.groupEnd();
  }, [count, key]);

  useEffect(() => {
    console.group('useEffect:componentDidUpdate');
    console.log(`count:${count}`);
    console.log(`key:${key}`);
    console.log(`value:${value}`);
    console.groupEnd();
  }, [count]);

  useEffect(
    () => () => {
      console.group('useEffect:componentWillUnmount');
      console.groupEnd();
    },
    [],
  );

  const addCount = () => {
    setCount(count + 1);
  };
  const addKey = () => {
    setKey(key + 1);
  };

  return (
    <Fragment>
      <Space>
        <Button onClick={addCount}>count + 1</Button>
        <Button onClick={addKey}>key + 1</Button>
      </Space>
      <p>value: {value}</p>
      <p>count: {count}</p>
      <p>key: {key}</p>
    </Fragment>
  );
};
