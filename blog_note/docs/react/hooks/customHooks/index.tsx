import { Alert, Input } from 'antd';
import React, { Fragment } from 'react';
import useWindowResize from './useWindowResize';

const CustomHooks = () => {
  const size = useWindowResize();
  const { width, height } = size;
  return (
    <Fragment>
      <Alert type="info" message="自定义Hooks" />
      <Input addonBefore="页面宽度" addonAfter="px" value={width} />
      <Input addonBefore="页面高度" addonAfter="px" value={height} />
    </Fragment>
  );
};

export default CustomHooks;
