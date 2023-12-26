import { Button, Divider } from 'antd';
import React, { Fragment, useRef } from 'react';
import Ref from './ref';

const ImperativeHandle = () => {
  const input = useRef<HTMLInputElement>(null);
  const updateInput = () => {
    console.group('input');
    console.log('group');
    console.groupEnd();
    console.dir(input);
    if (input && input.current) {
      input.current.value = `outer set ${new Date().getTime()}`;
    }
  };

  return (
    <Fragment>
      <Divider orientation="left">父组件</Divider>
      <Button onClick={updateInput}>父组件更新</Button>
      <Ref ref={input} />
    </Fragment>
  );
};
export default ImperativeHandle;
