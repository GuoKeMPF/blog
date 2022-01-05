import { ReactElement, useEffect } from 'react';
import { Skeleton, Card, Button, List } from 'antd';
import { connect, withRouter } from 'umi';
import type { DraftsStateType, DraftStateType, Dispatch, Loading } from 'umi';
import { formColums } from '@/utils/layoutFrom';
import { formType } from '@/utils/enum';
import DraftItem from './draftItem';

const Draft = ({
  drafts,
  dispatch,
  loading,
  history,
}: {
  drafts: DraftsStateType.Drafts;
  dispatch: Dispatch;
  loading: boolean;
  history: any;
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
    <Card title="草稿箱" extra={<Button onClick={addDraft}>新建</Button>}>
      <Skeleton loading={loading} active>
        <List
          grid={{ gutter: 16, ...formColums(1, 1, 2, 3, 4, 6) }}
          dataSource={drafts}
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
export default withRouter(
  connect(({ draft, loading }: { draft: DraftStateType; loading: Loading }) => ({
    drafts: draft.drafts,
    loading: !!loading.effects['draft/queryDrafts'] || !!loading.effects['draft/deleteDraft'],
  }))(Draft),
);
