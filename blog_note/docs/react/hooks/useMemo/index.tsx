import { Button, Divider, Space } from 'antd';
import React, { Fragment, useState } from 'react';
import Memo from './memo';
import NoneMemo from './noneMemo';

const MemoComponent = () => {
  const [red, setRed] = useState(new Date());
  const [blue, setBlue] = useState(new Date());
  const [yellow, setYellow] = useState(new Date());

  const genNow = () => {
    return new Date();
  };

  return (
    <Fragment>
      <Space>
        <Button onClick={() => setRed(genNow())}>red</Button>
        <Button onClick={() => setBlue(genNow())}>blue</Button>
        <Button onClick={() => setYellow(genNow())}>yellow</Button>
      </Space>
      <Divider orientation="left">Memo</Divider>
      <Memo {...{ red, blue, yellow }} />
      <Divider orientation="left">NoneMemo</Divider>
      <NoneMemo {...{ red, blue, yellow }} />
    </Fragment>
  );
};
export default MemoComponent;
