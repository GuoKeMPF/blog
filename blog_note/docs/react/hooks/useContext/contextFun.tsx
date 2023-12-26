import { Divider } from 'antd';
import React, { Fragment } from 'react';

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
