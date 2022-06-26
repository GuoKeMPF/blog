import { Fragment, useEffect, useMemo } from 'react';
import { Card, Button, Popconfirm, Space, Table, Typography } from 'antd';
import { TableColumnsType } from 'antd';

import { DeleteOutlined, DownloadOutlined, SendOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import AudioForm from './AudioForm';
import styles from './index.less';

import type { ReactElement } from 'react';
import type { AudioStateType, Dispatch, Loading } from 'umi';

const { Paragraph } = Typography;

const Audio = ({
  audios,
  dispatch,
  loading,
}: {
  audios: AudioStateType.AudiosType;
  dispatch: Dispatch;
  loading: boolean;
}): ReactElement => {
  useEffect(() => {
    dispatch({
      type: 'audio/queryAudios',
    });
  }, [dispatch]);

  const onUpload = () => {
    dispatch({
      type: 'picture/setVisiable',
      payload: {
        visiable: true,
      },
    });
  };

  const onChange = (p: number, s: number) => {
    console.log(p, s);

    dispatch({
      type: 'picture/queryPictures',
      payload: {
        page: p,
        size: s,
      },
    });
  };

  const onDelete = (picture: AudioStateType.AudioType) => {
    dispatch({
      type: 'picture/deletePicture',
      payload: {
        id: picture.id,
      },
    });
  };
  const columns = useMemo<TableColumnsType<object>>(() => {
    const column: TableColumnsType<object> = [
      {
        title: '编号',
        key: 'index',
        dataIndex: 'index',
        render(t, r, i) {
          return i;
        },
      },
      {
        title: '名字',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        key: 'create_time',
        dataIndex: 'create_time',
      },
      {
        title: '操作',
        key: 'opreation',
        dataIndex: 'opreation',
        render(t, r) {
          return (
            <Space>
              <Button type="link" danger>
                <Paragraph key="copy" copyable={{ text: r.src }} />
              </Button>
              <Popconfirm
                key="delete"
                title={`是否确认删除${r.name}？`}
                onConfirm={() => onDelete(r)}
                okText="是"
                cancelText="否"
              >
                <Button type="link" danger>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];
    return column;
  }, [onUpload]);

  return (
    <Fragment>
      <AudioForm />
      <Card title="音频" className={styles.audios} extra={<Button onClick={onUpload}>新建</Button>}>
        <Table
          columns={columns}
          loading={loading}
          dataSource={audios}
          pagination={{
            size: 'small',
            showSizeChanger: true,
            onChange: onChange,
          }}
        />
      </Card>
    </Fragment>
  );
};
export default connect(({ audio, loading }: { audio: AudioStateType; loading: Loading }) => ({
  audios: audio.audios,
  loading: !!loading.effects['audio/queryAudios'],
}))(Audio);
