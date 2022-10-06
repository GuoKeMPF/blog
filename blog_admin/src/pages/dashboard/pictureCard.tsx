import { useMemo } from 'react';

import { Card } from 'antd';
import { connect, history } from 'umi';
import styles from './card.less';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { FC } from 'react';
import type { DashboardModelState, Dispatch, Loading } from 'umi';

type PictureCardPropsType = {
  loading: boolean;
  picture: number;
  dispatch: Dispatch;
};

const PictureCard: FC<PictureCardPropsType> = ({ loading, dispatch, picture }) => {
  const createItem = useMemo(() => {
    return () => {
      dispatch({
        type: 'picture/setVisiable',
        payload: {
          visiable: true,
        },
      });
    };
  }, [dispatch]);

  const detailItem = useMemo(() => {
    return () => {
      history.push('/picture');
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
      {picture}
    </Card>
  );
};

const ConnectFC = connect(
  ({ dashboard, loading }: { dashboard: DashboardModelState; loading: Loading }) => ({
    picture: dashboard.picture,
    loading: loading.effects['dashboard/getDashboard'],
  }),
)(PictureCard);

export default ConnectFC;
