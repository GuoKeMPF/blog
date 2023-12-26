import { Divider } from 'antd';
import React, { Fragment } from 'react';
import { Effect } from './effect';
import { LayoutEffect } from './layoutEffect';

const LayoutEffectComponent = () => {
  return (
    <Fragment>
      <Divider orientation="left">uesEffect</Divider>
      <Effect />

      <Divider orientation="left">useLayoutEffect</Divider>
      <LayoutEffect />
    </Fragment>
  );
};
export default LayoutEffectComponent;
