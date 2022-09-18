import React, { Fragment } from 'react';
import { Alert, Input } from 'antd';
import useWindowResize from './useWindowResize';

const CustomHooks = () => {
  const size = useWindowResize();
  const { width, height } = size;
  return (
    <Fragment>
      <Alert message="自定义Hooks" description="自定义Hooks" type="info" />
      <Input addonBefore="页面宽度" addonAfter="px" value={width} />
      <Input addonBefore="页面高度" addonAfter="px" value={height} />
    </Fragment>
  );
};

export default CustomHooks;
