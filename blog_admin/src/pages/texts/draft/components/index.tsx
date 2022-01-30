import { ReactElement, useEffect } from 'react';
import { Skeleton, Card, Button, List } from 'antd';
import { connect } from 'umi';
import type { DraftsStateType, DraftStateType, Dispatch, Loading } from 'umi';
import { formColums } from '@/utils/layoutFrom';
import { formType } from '@/utils/enum';
import DraftItem from './draftItem';

import styles from './index.less';

const Draft = ({
  drafts,
  dispatch,
  loading,
}: {
  drafts: DraftsStateType.Drafts;
  dispatch: Dispatch;
  loading: boolean;
}): ReactElement => {
  useEffect(() => {
    dispatch({
      type: 'draft/queryDrafts',
    });
  }, []);

  const addDraft = () => {
    dispatch({
      type: 'draft/toEdit',
      payload: {
        type: formType.create,
      },
    });
  };

  return (
    <Card
      title="草稿箱"
      className={styles.container}
      extra={<Button onClick={addDraft}>新建</Button>}
    >
      <Skeleton loading={loading} active>
        <List
          grid={{ gutter: 16, ...formColums(1, 1, 2, 3, 4, 6) }}
          dataSource={drafts}
          pagination={{
            position: 'both',
            size: 'small',
            showSizeChanger: true,
          }}
          renderItem={(item: DraftsStateType.Draft) => (
            <List.Item>
              <DraftItem key={item.id} draft={item} />
            </List.Item>
          )}
        />
      </Skeleton>
    </Card>
  );
};
export default connect(({ draft, loading }: { draft: DraftStateType; loading: Loading }) => ({
  drafts: draft.drafts,
  loading: !!loading.effects['draft/queryDrafts'] || !!loading.effects['draft/deleteDraft'],
}))(Draft);
