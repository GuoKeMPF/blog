import { Modal, Form, Input, Upload } from 'antd';
import FormFooter from '@/components/Footer/FormFooter';
import { InboxOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import type { ReactElement } from 'react';
import type { PictureStateType, Dispatch, Loading } from 'umi';
const { TextArea } = Input;
const { Dragger } = Upload;

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

const AudioForm = ({
  dispatch,
  visiable,
  loading,
}: {
  dispatch: Dispatch;
  loading: boolean;
  visiable: boolean;
}): ReactElement => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const payload = new FormData();
    const { description, file } = values;
    payload.append('description', description);
    const { fileList } = file;
    fileList.forEach((f: any) => {
      payload.append('file', f.originFileObj);
    });
    dispatch({
      type: 'picture/addPictures',
      payload,
    });
  };

  const onConcel = () => {
    dispatch({
      type: 'picture/setVisiable',
      payload: {
        visiable: false,
      },
    });
  };

  const afterClose = () => {
    form.resetFields();
  };

  return (
    <Modal
      afterClose={afterClose}
      title="上传图片"
      onCancel={onConcel}
      footer={null}
      visible={visiable}
    >
      <Form
        name="upload_image"
        initialValues={{ file: [] }}
        onFinish={onFinish}
        autoComplete="off"
        {...formItemLayout}
        form={form}
      >
        <Form.Item
          label="文件"
          name="file"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Dragger action="/" name="file" beforeUpload={() => false} multiple={true}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
          </Dragger>
        </Form.Item>

        <Form.Item
          label="描述"
          name="description"
          rules={[{ max: 255, message: '最大长度为 255', type: 'string' }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <FormFooter
            name="upload_image"
            submitLoading={loading}
            onConcel={onConcel}
            onSubmit={onFinish}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ picture, loading }: { picture: PictureStateType; loading: Loading }) => ({
  loading: !!loading.effects['draft/addPicture'],
  visiable: picture.visiable,
}))(AudioForm);
