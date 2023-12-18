import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Space } from 'antd';
import React from 'react';

type RegFormProps = {
  regexp?: RegExp;
};

export default function RegForm({ regexp = /[\s\S]/ }: RegFormProps) {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="regTestForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      wrapperCol={{ span: 24 }}
    >
      <Form.List name="strings">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field) => (
              <Form.Item shouldUpdate required={false} key={field.key}>
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      pattern: regexp,
                      message: '正则不匹配',
                    },
                  ]}
                  noStyle
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
              </Form.Item>
            ))}
            <Form.Item>
              <Space>
                <Button onClick={() => add()} icon={<PlusOutlined />}>
                  添加一个待测试字符串
                </Button>
                <Button type="primary" htmlType="submit">
                  测试
                </Button>
              </Space>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
}
