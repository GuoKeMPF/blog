import { useMemo } from 'react';

import { Card } from 'antd';
import { connect, history } from 'umi';
import styles from './card.less';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { formType } from '@/utils/enum';
import type { FC } from 'react';
import type { DashboardModelState, Dispatch, Loading } from 'umi';

type TextCardPropsType = {
  loading: boolean;
  text: number;
  dispatch: Dispatch;
};

const TextCard: FC<TextCardPropsType> = ({ loading, text, dispatch }) => {
  const createItem = useMemo(() => {
    return () => {
      dispatch({
        type: 'text/toEdit',
        payload: {
          type: formType.create,
        },
      });
    };
  }, [dispatch]);

  const detailItem = useMemo(() => {
    return () => {
      history.push('/texts/text');
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
      {text}
    </Card>
  );
};

const ConnectFC = connect(
  ({ dashboard, loading }: { dashboard: DashboardModelState; loading: Loading }) => ({
    text: dashboard.text,
    loading: loading.effects['dashboard/getDashboard'],
  }),
)(TextCard);

export default ConnectFC;
