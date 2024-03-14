

import React from "react";
import type { SliderSingleProps } from 'antd';

export const piMarks: SliderSingleProps['marks'] = {
  0: '0',
  [Math.PI]: {
    label: <strong>&#960;</strong>,
  },
  [2 * Math.PI]: {
    label: <strong>2&#960; </strong>,
  },
};



