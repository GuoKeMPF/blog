import React, { Fragment, useState } from 'react';
import { Tooltip, Button, Modal, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withPropsAPI } from 'gg-editor';
import Code from '../code';
import styles from './index.less';

type ToolbarButtonProps = {
  command: string;
  icon?: string;
  text?: string;
  propsAPI?: any;
};
const ToolbarButton: React.FC<ToolbarButtonProps> = props => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState('');
  const save = () => {
    const { save } = props.propsAPI;
    const obj = save();
    const data = JSON.stringify(obj);
    setData(data);
    setVisible(true);
  };

  const copy = () => {
    message.success('数据已复制');
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <Fragment>
      <Tooltip
        title={'save'}
        placement="bottom"
        overlayClassName={styles.tooltip}
      >
        <Button type="text" size="small" onClick={save}>
          <SaveOutlined />
        </Button>
      </Tooltip>
      <Modal
        title="Basic Modal"
        visible={visible}
        width="80%"
        onCancel={onCancel}
        destroyOnClose
        footer={
          <Fragment>
            <CopyToClipboard text={data} onCopy={copy}>
              <Button type="primary">复制</Button>
            </CopyToClipboard>
            <Button onClick={onCancel}>关闭</Button>
          </Fragment>
        }
      >
        <Code readOnly={false} defaultValue={data} language="json" />
      </Modal>
    </Fragment>
  );
};

export default withPropsAPI(ToolbarButton as any);
