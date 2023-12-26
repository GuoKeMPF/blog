/* eslint-disable react/button-has-type */
import { Button } from 'antd';
import React, { Fragment, createContext, useState } from 'react';
import { Context } from './context';
import { ContextFun } from './contextFun';

export interface ContextType {
  count: number;
  type: string;
  update: () => void;
}

export const CountContext = createContext({
  count: 0,
  type: 'useContext',
  update: () => {},
});

const ContextConponent = () => {
  const [count, setCount] = useState(0);
  const addCount = () => {
    setCount(count + 1);
  };

  return (
    <Fragment>
      <p>count: {count}</p>
      <Button onClick={addCount}>count + 1</Button>
      <CountContext.Provider
        value={{ count, type: 'useContext', update: addCount }}
      >
        <Context />
      </CountContext.Provider>
      <ContextFun count={count} type="ContextFun" />
    </Fragment>
  );
};

export default ContextConponent;
