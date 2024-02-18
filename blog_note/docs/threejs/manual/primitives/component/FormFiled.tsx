import React, { type FC } from "react";

import { FormUnitType, } from "./index"
import { Switch, Slider, Input } from "antd";

interface FormFiledProps extends FormUnitType {
  onChange?: (value: any) => void,
};

export const FormFiled: FC<FormFiledProps> = ({ onChange, type = "number", ...config }) => {


  switch (type) {
    case 'text':
      return <Input onChange={onChange} {...config} />
    case 'number':
      return <Slider onChange={onChange} {...config} min={config?.min || 0} max={config?.max || 100} />
    case 'boolean':
      return <Switch onChange={onChange} {...config}></Switch>
    default:
      {
        let defaultDom = <></> as never;
        return defaultDom;
      }
  }
};
