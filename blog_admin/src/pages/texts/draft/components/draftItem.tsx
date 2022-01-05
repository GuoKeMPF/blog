import { ReactElement } from 'react';
import { Card, Popconfirm, Typography } from 'antd';

import { connect } from 'umi';
import type { DraftsStateType, Dispatch } from 'umi';
import { DeleteOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons';
import { formType } from '@/utils/enum';

const { Paragraph, Text } = Typography;
const { Meta } = Card;
const DraftItem = ({
  dispatch,
  draft,
}: {
  draft: DraftsStateType.Draft;
  dispatch: Dispatch;
}): ReactElement => {
  const { id, title, content, description } = draft;

  const editItem = (): void => {
    dispatch({
      type: 'draft/toEdit',
      payload: {
        type: formType.update,
        id,
      },
    });
  };

  const deleteItem = (): void => {
    dispatch({
      type: 'draft/deleteDraft',
      payload: {
        id,
      },
    });
  };

  const detailItem = (): void => {
    console.log('detail', id);
  };

  return (
    // <Cols grid={formLayout(24, 24, 12, 8, 8, 6)}>
    <Card
      bordered
      hoverable
      actions={[
        <EditOutlined key="edit" onClick={editItem} />,
        <MessageOutlined key="detail" onClick={detailItem} />,
        <Popconfirm
          title="是否确认删除这篇草稿?"
          onConfirm={deleteItem}
          okText="是"
          cancelText="否"
        >
          <DeleteOutlined key="delete" />
        </Popconfirm>,
      ]}
    >
      <Meta
        title={title}
        description={
          <Paragraph italic ellipsis={true}>
            {description}
          </Paragraph>
        }
      />
      <Paragraph ellipsis={true}>{content}</Paragraph>
    </Card>
  );
};
export default connect()(DraftItem);
