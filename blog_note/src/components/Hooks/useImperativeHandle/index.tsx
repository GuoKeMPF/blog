import React, { useRef, Fragment } from 'react';
import { Button, Divider } from 'antd';
import Ref from './ref';

const useFefConponent = () => {
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
export default useFefConponent;
