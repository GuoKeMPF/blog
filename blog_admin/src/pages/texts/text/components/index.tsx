import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { Skeleton, Card, Button, List } from 'antd';
import { connect, withRouter } from 'umi';
import type { TextsStateType, TextStateType, Dispatch, Loading } from 'umi';
import { formColums } from '@/utils/layoutFrom';
import { formType } from '@/utils/enum';
import TextItem from './textItem';

const Text = ({
  texts,
  dispatch,
  loading,
}: {
  texts: TextsStateType.Texts;
  dispatch: Dispatch;
  loading: boolean;
}): ReactElement => {
  useEffect(() => {
    dispatch({
      type: 'text/queryTexts',
    });
  }, []);

  const addText = () => {
    dispatch({
      type: 'text/toEdit',
      payload: {
        type: formType.create,
      },
    });
  };

  return (
    <Card title="说说" extra={<Button onClick={addText}>新建</Button>}>
      <Skeleton loading={loading} active>
        <List
          grid={{ gutter: 16, ...formColums(1, 1, 2, 3, 4, 6) }}
          dataSource={texts}
          renderItem={(item: TextsStateType.Text) => (
            <List.Item>
              <TextItem key={item.id} text={item} />
            </List.Item>
          )}
        />
      </Skeleton>
    </Card>
  );
};
export default withRouter(
  connect(({ text, loading }: { text: TextStateType; loading: Loading }) => ({
    texts: text.texts,
    loading: !!loading.effects['text/queryTexts'] || !!loading.effects['text/deleteText'],
  }))(Text),
);
