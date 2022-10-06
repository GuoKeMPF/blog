import type { ReactElement } from 'react';
import { connect } from 'umi';
import { Form, Input, Modal } from 'antd';
import FormFooter from '@/components/Footer/FormFooter';
import Editor from '@/components/Editor';

import type { DraftsStateType, Dispatch, Loading } from 'umi';
import { formType } from '@/utils/enum';

const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

const Draft = ({
  dispatch,
  draft,
  loading,
}: {
  dispatch: Dispatch;
  draft: DraftsStateType.Draft;
  loading: boolean;
}): ReactElement => {
  const onFinish = (values: any) => {
    const { type } = draft;
    const dType = type === formType.create ? 'draft/addDraft' : 'draft/updateDraft';
    const payload =
      type === formType.create
        ? {
            ...values,
          }
        : {
            ...draft,
            ...values,
          };
    dispatch({
      type: dType,
      payload,
    });
  };

  const onConcel = () => {
    dispatch({ type: 'draft/afterEdit' });
  };

  const { title, description, content, visable } = draft;
  return (
    <Modal
      title="草稿箱"
      onCancel={onConcel}
      footer={null}
      destroyOnClose
      visible={visable}
      width={'80%'}
    >
      <Form
        name="draft"
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
          <FormFooter
            name="draft"
            onConcel={onConcel}
            onSubmit={onFinish}
            submitLoading={loading}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(
  ({ draft, loading }: { draft: DraftsStateType.Draft; loading: Loading }) => ({
    draft: draft.draft,
    loading: !!loading.effects['draft/addDraft'] || !!loading.effects['draft/updateDraft'],
  }),
)(Draft);
