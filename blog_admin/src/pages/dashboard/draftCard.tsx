import { useMemo } from 'react';

import { Card } from 'antd';
import { connect, history } from 'umi';
import styles from './card.less';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { formType } from '@/utils/enum';
import type { FC } from 'react';
import type { DashboardModelState, Dispatch, Loading } from 'umi';

type DraftCardPropsType = {
  loading: boolean;
  draft: number;
  dispatch: Dispatch;
};

const DraftCard: FC<DraftCardPropsType> = ({ loading, draft, dispatch }) => {
  const createItem = useMemo(() => {
    return () => {
      dispatch({
        type: 'draft/toEdit',
        payload: {
          type: formType.create,
        },
      });
    };
  }, [dispatch]);

  const detailItem = useMemo(() => {
    return () => {
      history.push('/texts/drafts');
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
      {draft}
    </Card>
  );
};

const ConnectFC = connect(
  ({ dashboard, loading }: { dashboard: DashboardModelState; loading: Loading }) => ({
    draft: dashboard.draft,
    loading: loading.effects['dashboard/getDashboard'],
  }),
)(DraftCard);

export default ConnectFC;
