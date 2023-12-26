import { Button, Space } from 'antd';
import React, { Fragment, useRef } from 'react';

const FefConponent = () => {
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
      <p>点击按钮更新input输入框内容</p>
      <Space>
        <Button onClick={updateInput}>更新</Button>
        <input type="text" ref={input} />
      </Space>
    </Fragment>
  );
};
export default FefConponent;
