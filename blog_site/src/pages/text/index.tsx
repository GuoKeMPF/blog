import React, { FC, Fragment, useEffect } from 'react';
import Spin from '@/components/Spin';
import { connect } from 'dva';
import { useRouteMatch } from 'umi';
import { Dispatch, InitTextStateType, TextsType } from 'umi';
import Breadcrumb from '@/components/Breadcrumb';
import Content from './Content';
import styles from './index.less';

interface PageProps {
  dispatch: Dispatch;
  loading: boolean;
  text: TextsType;
}

const Index: FC<PageProps> = ({ dispatch, loading, text }) => {
  const match = useRouteMatch();
  useEffect(() => {
    const { params }: { params: any } = match;
    const id = params.id ?? '';
    if (id !== '') {
      dispatch({
        type: 'texts/queryText',
        payload: {
          id,
        },
      });
    }
  }, []);

  const breadcrumb = {
    title: '主页',
    path: '/',
    children: {
      title: '日志',
      path: '/texts',
      children: {
        title: `${text.title || ''}`,
      },
    },
  };
  return (
    <div id="text" className={styles.text}>
      <Breadcrumb routers={breadcrumb} />
      <Spin loading={loading}>
        <Content {...text} />
      </Spin>
    </div>
  );
};
export default connect(
  ({ loading, texts }: { loading: any; texts: InitTextStateType }) => ({
    loading: !!loading.effects['texts/queryTexts'],
    text: texts.text,
  }),
)(Index);
