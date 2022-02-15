import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { Skeleton, Card, Button, List } from 'antd';
import { connect, withRouter } from 'umi';
import type { TextsStateType, TextStateType, Dispatch, Loading } from 'umi';
import { formColums } from '@/utils/layoutFrom';
import { formType } from '@/utils/enum';
import TextItem from './textItem';

import styles from './index.less';

const Text = ({
  texts,
  dispatch,
  loading,
  total,
  page,
  size,
}: {
  texts: TextsStateType.Texts;
  dispatch: Dispatch;
  loading: boolean;
  total: number;
  page: number;
  size: number;
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
  const onChange = (p: number, s: number) => {
    dispatch({
      type: 'text/queryTexts',
      payload: {
        page: p, size: s
      }
    });
  }

  return (
    <Card title="说说" className={styles.text} extra={<Button onClick={addText}>新建</Button>}>
      <Skeleton loading={loading} active>
        <List
          grid={{ gutter: 16, ...formColums(1, 1, 2, 3, 4, 6) }}
          dataSource={texts}
          pagination={{
            position: 'both',
            size: 'small',
            showSizeChanger: true,
            total,
            pageSize: size,
            current: page,
            onChange: onChange
          }}
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
    total: text.total,
    size: text.size,
    page: text.page,
    loading: !!loading.effects['text/queryTexts'] || !!loading.effects['text/deleteText'],
  }))(Text),
);
