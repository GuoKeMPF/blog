import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Space } from 'antd';
import React, { useEffect } from 'react';

type RegFormProps = {
  regexp?: RegExp;
};

interface Status {
  validateStatus: 'error' | 'success' | 'warning' | 'validating' | 'empty';
  prefix?: React.ReactNode;
  help?: string;
}

export default function RegForm({ regexp = /[\s\S]/ }: RegFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.validateFields({
      dirty: true,
    });
  }, [regexp]);

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // const validateFields = (value: string): Status => {
  //   let status: Status = {
  //     validateStatus: 'empty',
  //   };
  //   if (value === '') {
  //     status = {
  //       validateStatus: 'warning',
  //       prefix: <ExclamationCircleOutlined />,
  //       help: '请输入需要验证的字符串',
  //     };
  //   } else if (regexp.test(value)) {
  //     status = {
  //       validateStatus: 'success',
  //       prefix: <CheckCircleOutlined />,
  //       help: '验证通过',
  //     };
  //   } else {
  //     status = {
  //       validateStatus: 'error',
  //       prefix: <CloseCircleOutlined />,
  //       help: '验证不通过',
  //     };
  //   }
  //   return status;
  // };

  return (
    <Form
      form={form}
      name="regTestForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      wrapperCol={{ span: 24 }}
      initialValues={{ strings: [''] }}
    >
      <Form.List name="strings">
        {(fields, { add, remove }, mate) => {

          return (
            <>
              {fields.map((field) => {
                const value = form.getFieldValue(['strings', field.key]);
                console.log(value);
                return (
                  <Form.Item
                    validateDebounce={500}
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        pattern: regexp,
                        message: '正则不匹配',
                      },
                    ]}
                    shouldUpdate
                    required={false}
                    key={field.key}
                  >
                    <Flex gap={'8px'}>
                      <Input.TextArea
                        allowClear
                        showCount
                        placeholder="请输入需要验证的字符串"
                        style={{ flex: 1 }}
                      />
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Flex>
                  </Form.Item>
                );
              })}
              <Form.Item>
                <Space>
                  <Button
                    className="addTestString"
                    id="addTestString"
                    onClick={() => add('')}
                    icon={<PlusOutlined />}
                  >
                    添加一个待测试字符串
                  </Button>
                  <Button
                    className="checkString"
                    id="checkString"
                    type="primary"
                    htmlType="submit"
                  >
                    测试
                  </Button>
                </Space>
                {/* <Form.ErrorList errors={errors} /> */}
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </Form>
  );
}
