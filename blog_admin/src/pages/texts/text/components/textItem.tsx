import type { ReactElement } from 'react';
import { Card, Popconfirm, Typography } from 'antd';

import { connect } from 'umi';
import type { TextsStateType, Dispatch } from 'umi';
import { DeleteOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons';
import { formType } from '@/utils/enum';

const { Paragraph } = Typography;
const { Meta } = Card;
const TextItem = ({
  dispatch,
  text,
}: {
  text: TextsStateType.Text;
  dispatch: Dispatch;
}): ReactElement => {
  const { id, title, content, description } = text;

  const editItem = (): void => {
    dispatch({
      type: 'text/toEdit',
      payload: {
        type: formType.update,
        id,
      },
    });
  };

  const deleteItem = (): void => {
    dispatch({
      type: 'text/deleteText',
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
          key="delete"
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
export default connect()(TextItem);
