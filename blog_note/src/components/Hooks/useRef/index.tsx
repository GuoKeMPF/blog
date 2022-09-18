import React, { useRef, Fragment } from 'react';
import { Button, Divider } from 'antd';

const useFefConponent = () => {
  const input = useRef<HTMLInputElement>(null);
  const updateInput = () => {
    console.group('input');
    console.log('group');
    console.groupEnd();
    console.dir(input.current);
    if (input && input.current) {
      input.current.value = `inner set ${new Date().getTime()}`;
    }
  };

  return (
    <Fragment>
      <Button onClick={updateInput}>更新</Button>
      <Divider orientation="left">ref</Divider>
      <input type="text" ref={input} />
      <p>点击按钮更新input输入框内容</p>
    </Fragment>
  );
};
export default useFefConponent;
