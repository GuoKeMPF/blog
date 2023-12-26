import { Button, Divider } from 'antd';
import React, { Fragment, useContext } from 'react';
import { ContextType, CountContext } from '.';

export const Context = () => {
  const { count, type, update } = useContext<ContextType>(CountContext);
  return (
    <Fragment>
      <Divider orientation="left">context</Divider>
      <Button onClick={update}>count + 1</Button>
      <p>type: {type}</p>
      <p>counter: {count}</p>
    </Fragment>
  );
};
