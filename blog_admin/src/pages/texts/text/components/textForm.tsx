import type { ReactElement } from 'react';
import { connect } from 'umi';
import { Form, Input, Modal } from 'antd';
import FormFooter from '@/components/Footer/FormFooter';
import Editor from '@/components/Editor';

import type { TextsStateType, Dispatch, Loading } from 'umi';
import { formType } from '@/utils/enum';

const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

const Text = ({
  dispatch,
  text,
  loading,
}: {
  dispatch: Dispatch;
  text: TextsStateType.Text;
  loading: boolean;
}): ReactElement => {
  const onFinish = (values: any) => {
    const { type } = text;
    const dType = type === formType.create ? 'text/addText' : 'text/updateText';
    const payload =
      type === formType.create
        ? {
            ...values,
          }
        : {
            ...text,
            ...values,
          };
    dispatch({
      type: dType,
      payload,
    });
  };

  const onConcel = () => {
    dispatch({ type: 'text/afterEdit' });
  };

  const { title, description, content, visable } = text;
  return (
    <Modal
      title="说说"
      onCancel={onConcel}
      maskClosable={false}
      footer={null}
      style={{ top: 20 }}
      destroyOnClose
      visible={visable}
      width={'80%'}
    >
      <Form
        name="text"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          title,
          description,
          content,
        }}
      >
        <Form.Item
          rules={[{ required: true, message: '请输入标题', type: 'string' }]}
          name="title"
          label="标题"
        >
          <Input placeholder="请输入标题" />
        </Form.Item>

        <Form.Item name="description" label="描述">
          <TextArea placeholder="请输入描述" />
        </Form.Item>

        <Form.Item
          name="content"
          label="内容"
          rules={[{ required: true, message: '请输入内容', type: 'string' }]}
        >
          <Editor />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: formItemLayout.labelCol.span }}>
          <FormFooter name="text" onConcel={onConcel} onSubmit={onFinish} submitLoading={loading} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ text, loading }: { text: TextsStateType.Text; loading: Loading }) => ({
  text: text.text,
  loading: !!loading.effects['text/addText'] || !!loading.effects['text/updateText'],
}))(Text);
