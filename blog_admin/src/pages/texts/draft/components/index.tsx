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
  total,
  page,
  size,
}: {
  drafts: DraftsStateType.Drafts;
  dispatch: Dispatch;
  loading: boolean;
  total: number;
  page: number;
  size: number;
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

  const onChange = (p: number, s: number) => {
    dispatch({
      type: 'draft/queryDrafts',
      payload: {
        page: p, size: s
      }
    });
  }

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
            total,
            pageSize: size,
            current: page,
            onChange: onChange
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
  total: draft.total,
  size: draft.size,
  page: draft.page,
  loading: !!loading.effects['draft/queryDrafts'] || !!loading.effects['draft/deleteDraft'],
}))(Draft);
