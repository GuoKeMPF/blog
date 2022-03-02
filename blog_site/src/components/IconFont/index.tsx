import React, { HTMLAttributes } from 'react';
import type { FC } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: ['/public/font/iconfont.js'],
});
interface Props extends HTMLAttributes<HTMLElement> {
  type: string;
};
const Icons: FC<Props> = (props) => {
  return <IconFont {...props} />;
};

export default Icons;
