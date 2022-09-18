import React, { Fragment } from 'react';
import { Divider } from 'antd';
import { Effect } from './effect';
import { LayoutEffect } from './layoutEffect';

const UseLayoutEffectComponent = () => {
  return (
    <Fragment>
      <Divider orientation="left">uesEffect</Divider>
      <Effect />
      <Divider orientation="left">useLayoutEffect</Divider>
      <LayoutEffect />
    </Fragment>
  );
};
export default UseLayoutEffectComponent;
