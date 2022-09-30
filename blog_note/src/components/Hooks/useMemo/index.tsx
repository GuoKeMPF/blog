import React, { useState, createContext, Fragment } from 'react';
import { Button, Divider } from 'antd';
import Memo from './memo';
import NoneMemo from './noneMemo';

export const MemoContext = createContext();

const useMemoComponent = () => {
  const [red, setRed] = useState(new Date().getTime());
  const [blue, setBlue] = useState(new Date().getTime());
  const [yellow, setYellow] = useState(new Date().getTime());
  return (
    <Fragment>
      <Button.Group>
        <Button onClick={() => setRed(new Date().getTime())}>red</Button>
        <Button onClick={() => setBlue(new Date().getTime())}>blue</Button>
        <Button onClick={() => setYellow(new Date().getTime())}>yellow</Button>
      </Button.Group>
      <MemoContext.Provider value={{ red, blue, yellow }}>
        <Divider orientation="left">Memo</Divider>
        <Memo />
        <Divider orientation="left">NoneMemo</Divider>
        <NoneMemo />
      </MemoContext.Provider>
    </Fragment>
  );
};
export default useMemoComponent;
