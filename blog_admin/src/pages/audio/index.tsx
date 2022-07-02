import { Fragment, useEffect, useMemo, useState } from 'react';
import { Card, Button, Popconfirm, Space, Table, Typography } from 'antd';
import { TableColumnsType } from 'antd';

import { DeleteOutlined, DownloadOutlined, CaretRightOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import AudioForm from './AudioForm';
import styles from './index.less';

import Player from './Player';
import Operation from './Operation';

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
  const [audio, setAudio] = useState<AudioStateType.AudioType>();

  useEffect(() => {
    dispatch({
      type: 'audio/queryAudios',
    });
  }, [dispatch]);

  const onUpload = () => {
    dispatch({
      type: 'audio/setVisiable',
      payload: {
        visiable: true,
      },
    });
  };

  const onChange = (p: number, s: number) => {
    dispatch({
      type: 'audio/queryAudios',
      payload: {
        page: p,
        size: s,
      },
    });
  };

  const onClickRow = (recoder: AudioStateType.AudioType) => {
    setAudio(recoder);
  };

  const onDelete = (audio: AudioStateType.AudioType) => () => {
    dispatch({
      type: 'audio/deleteAudio',
      payload: {
        id: audio.id,
      },
    });
  };

  const onReset = () => {
    setAudio(undefined);
  };

  const onSwitch = (step: 1 | -1) => {
    const index = audios.findIndex((a) => audio?.id === a.id);
    let nextIndex = index + step;
    if (nextIndex >= audios.length) {
      nextIndex = 0;
    }
    if (nextIndex < 0) {
      nextIndex = audios.length - 1;
    }
    const nextAudio = audios[nextIndex];
    setAudio(nextAudio);
  };

  const onPlayAll = () => {
    if (audios.length) {
      setAudio(audios[0]);
    }
  };

  const columns = useMemo<TableColumnsType<object>>(() => {
    const column: TableColumnsType<object> = [
      {
        title: '编号',
        key: 'index',
        dataIndex: 'index',
        render(t, r, i) {
          return i + 1;
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
        render(t, r: any) {
          return (
            <Space>
              <a
                href={`${r.src}`}
                target="_blank"
                key="download"
                download={r.name}
                rel="noreferrer"
              >
                <Button type="link">
                  <DownloadOutlined />
                </Button>
              </a>
              <Button type="link">
                <CaretRightOutlined />
              </Button>
              <Button type="link">
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
  }, [onDelete]);

  return (
    <Fragment>
      <AudioForm />
      <Card title="音频" className={styles.audios} extra={<Button onClick={onUpload}>新建</Button>}>
        <Table
          size="small"
          rowKey={(r: any) => r.id}
          columns={columns}
          scroll={{ y: 500, x: 'max-content' }}
          loading={loading}
          dataSource={audios}
          pagination={{
            size: 'small',
            showSizeChanger: true,
            onChange: onChange,
          }}
          rowClassName={(record: any) =>
            record.id === audio?.id ? styles.active : styles.deactive
          }
          onRow={(record: any) => ({
            onClick: () => {
              onClickRow(record);
            },
          })}
          title={() => <Operation disabled={!audios.length} onPlayAll={onPlayAll} />}
          footer={() => (
            <Player onReset={onReset} onSwitch={onSwitch} src={audio?.src} name={audio?.name} />
          )}
        />
      </Card>
    </Fragment>
  );
};
export default connect(({ audio, loading }: { audio: AudioStateType; loading: Loading }) => ({
  audios: audio.audios,
  loading: !!loading.effects['audio/queryAudios'],
}))(Audio);
