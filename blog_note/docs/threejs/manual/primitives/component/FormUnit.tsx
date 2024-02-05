import { Form, Slider } from "antd";
import React, { type FC, useMemo } from "react";


interface FormUnitType {
  label: string;
  defaultValue: number;
};


type FormUnitProps = {
  onFormChange: (value: any) => void;
  configs: FormUnitType[];
};




const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};


export const FormUnit: FC<FormUnitProps> = ({ onFormChange, configs }) => {
  const initValues = useMemo(() => {
    return configs.reduce((acc, cur) => {
      acc[cur.label] = cur?.defaultValue ?? 0;
      return acc;
    }, {})
  }, [configs])
  return <Form
    {...formItemLayout}
    initialValues={initValues}
    style={{ maxWidth: 600 }}
  >

    <Form.Item name="slider" label="Slider">
      <Slider />
    </Form.Item>
  </Form>;
};

