import { Form } from "antd";
import React, { type FC, useMemo } from "react";
import { FormUnitType, FormFiled } from "./index"


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
    size="small"
    style={{ maxWidth: 600 }}
    onValuesChange={(_, values) => {
      onFormChange(values);
    }}
  >
    {
      configs.map((config) => {
        return <Form.Item name={config.label} key={config.label} label={config.label}>
          <FormFiled {...config} />
        </Form.Item>
      })
    }
  </Form>;
};

