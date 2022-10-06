import type { FC } from 'react';
import { useMemo } from 'react';

import { Card } from 'antd';
import { connect, history } from 'umi';

import type { DashboardModelState, Dispatch, Loading } from 'umi';
import styles from './card.less';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';

type AudioCardPropsType = {
  loading: boolean;
  audio: number;
  dispatch: Dispatch;
};

const AudioCard: FC<AudioCardPropsType> = ({ loading, audio, dispatch }) => {
  const createItem = useMemo(() => {
    return () => {
      dispatch({
        type: 'audio/setVisiable',
        payload: {
          visiable: true,
        },
      });
    };
  }, [dispatch]);

  const detailItem = useMemo(() => {
    return () => {
      history.push('/audio');
    };
  }, []);

  return (
    <Card
      loading={loading}
      size="small"
      className={styles.card}
      actions={[
        <SearchOutlined key="detail" onClick={detailItem} />,
        <PlusCircleOutlined key="create" onClick={createItem} />,
      ]}
    >
      {audio}
    </Card>
  );
};

const ConnectFC = connect(
  ({ dashboard, loading }: { dashboard: DashboardModelState; loading: Loading }) => ({
    audio: dashboard.audio,
    loading: loading.effects['dashboard/getDashboard'],
  }),
)(AudioCard);

export default ConnectFC;
