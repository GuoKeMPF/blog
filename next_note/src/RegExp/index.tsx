import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import React, {
  Fragment,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Raphael, parse, visualize } from 'regulex_common';

import useStyles from './index.style';

const { Text, Paragraph } = Typography;

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
  const [testForm] = Form.useForm();
  const [paper, setPaper] = useState<any>();

  const [validateStatus, setValidateStatus] = useState<
    undefined | 'error' | 'success'
  >(undefined);
  const [helpStr, setHelpStr] = useState<ReactNode>(null);

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

  const onChangeTestStr = useMemo(
    () => async () => {
      const values = await testForm.getFieldsValue();
      const { testString } = values;
      if (!testString || !reg) {
        setValidateStatus(undefined);
        setHelpStr(null);
        return;
      }
      if (reg.test(testString)) {
        setValidateStatus('success');
        setHelpStr(
          <Text type="success">
            <CheckCircleOutlined />
            通过
          </Text>,
        );
      }
      if (!reg.test(testString)) {
        setValidateStatus('error');
        setHelpStr(
          <Text type="danger">
            <CloseCircleOutlined />
            不通过
          </Text>,
        );
      }
    },
    [reg],
  );

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

      <Form
        name="test"
        form={testForm}
        onValuesChange={onChangeTestStr}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
      >
        <Form.Item
          name="testString"
          extra={helpStr}
          validateStatus={validateStatus}
          shouldUpdate
        >
          <Input.TextArea allowClear placeholder="请输入需要验证的字符串" />
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default RegExpFC;
