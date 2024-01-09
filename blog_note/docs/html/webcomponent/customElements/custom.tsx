import React, { useEffect, Fragment, type FC } from "react";
import { PopupInfo } from "./Elements";

import image from './image.jpeg';

export const CustomizedBuiltInElement: FC = () => {

  useEffect(() => {
    customElements.define("popup-info", PopupInfo);
  }, [])

  return <Fragment>
    <popup-info
      img={image}
      data-text="测试描述文字"></popup-info>
  </Fragment >;
};

export default CustomizedBuiltInElement

