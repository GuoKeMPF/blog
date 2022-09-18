import React, { Fragment } from 'react';
import { Divider } from 'antd';

interface ContextType {
  count: number;
  type: string;
}

export const ContextFun = (props: ContextType) => {
  const { count, type } = props;
  return (
    <Fragment>
      <Divider orientation="left">props</Divider>
      <p>type: {type}</p>
      <p>counter: {count}</p>
    </Fragment>
  );
};
