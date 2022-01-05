import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: ['/public/font/iconfont.js'],
});

export default (props?: any) => {
  return <IconFont {...props} />;
};
