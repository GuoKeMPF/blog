import React, { Fragment, useEffect, type FC } from 'react';
import { PopupInfo } from './Elements';

import image from './image.jpeg';

export const CustomizedBuiltInElement: FC = () => {
  useEffect(() => {
    if (!customElements.get('popup-info')) {
      customElements.define('popup-info', PopupInfo);
    }
  }, []);

  return (
    <Fragment>
      <popup-info img={image} data-text="测试描述文字"></popup-info>
    </Fragment>
  );
};

export default CustomizedBuiltInElement;
