import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import React, { Fragment, useEffect, useRef, useState } from 'react';

import { Raphael, parse, visualize } from 'regulex_common';

import useStyles from './index.style';

import RegForm from './regForm';

const { Paragraph } = Typography;

const getRegexFlags = (re: {
  global: boolean;
  ignoreCase: boolean;
  multiline: boolean;
}) => {
  let flags = '';
  flags += re.ignoreCase ? 'i' : '';
  flags += re.global ? 'g' : '';
  flags += re.multiline ? 'm' : '';
  return flags;
};

const RegExpFC = () => {
  const { styles } = useStyles();
  const regVisualizeContainer = useRef<HTMLDivElement>(null);
  const [reg, setReg] = useState<RegExp>();
  const [form] = Form.useForm();
  const [paper, setPaper] = useState<any>();

  useEffect(() => {
    if (regVisualizeContainer.current) {
      const p = Raphael(regVisualizeContainer.current, 0, 0);
      setPaper(p);
    }
  }, [regVisualizeContainer]);

  const onChangeReg = async () => {
    const values = await form.getFieldsValue();
    // global, ignoreCase, multiline, regStr
    const { regStr, ...others } = values;
    if (!regStr) {
      return;
    }
    try {
      const flags = getRegexFlags(others);
      const regexp = new RegExp(regStr, flags);
      setReg(regexp);
      visualize(parse(regexp.source), flags, paper);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Fragment>
      <Form
        form={form}
        name="reg"
        onValuesChange={onChangeReg}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
      >
        <Form.Item
          name="regStr"
          rules={[{ required: true, message: '请输入正则表达式' }]}
        >
          <Input prefix="/" suffix="/" placeholder="请输入正则表达式" />
        </Form.Item>
        <Form.Item name="ignoreCase" valuePropName="checked" noStyle>
          <Checkbox>忽略大小写</Checkbox>
        </Form.Item>
        <Form.Item name="global" valuePropName="checked" noStyle>
          <Checkbox>全局搜索</Checkbox>
        </Form.Item>
        <Form.Item name="multiline" valuePropName="checked" noStyle>
          <Checkbox>多段搜索</Checkbox>
        </Form.Item>

        <Form.Item noStyle>
          <Space>
            <Button type="text" htmlType="submit">
              <Paragraph
                copyable={{
                  icon: ['复制', '复制成功'],
                  text: reg?.toLocaleString() || '',
                }}
              ></Paragraph>
            </Button>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div
        id="regVisualizeContainer"
        ref={regVisualizeContainer}
        className={styles.regVisualizeContainer}
      ></div>
      <RegForm regexp={reg} />
    </Fragment>
  );
};

export default RegExpFC;
