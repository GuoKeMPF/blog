import { FC, Fragment, useEffect } from 'react';
import Spin from '@/components/Spin';
import { Dispatch, InitTextStateType, TextsType, connect } from 'umi';
import TextItem from './TextItem';
import styles from './index.less';

interface PageProps {
  dispatch: Dispatch;
  loadingTexts: boolean;
  texts: TextsType[];
}

const Index: FC<PageProps> = ({ dispatch, loadingTexts, texts }) => {
  useEffect(() => {
    dispatch({
      type: 'texts/queryTexts',
    });
  }, []);

  return (
    <Fragment>
      <Spin loading={loadingTexts}>
        {texts.map((item) => (
          <div key={item.id} className={styles.container}>
            <div className={styles.line}>
              <div className={styles.index}></div>
            </div>
            <div className={styles.texts}>
              <TextItem text={item} />
            </div>
          </div>
        ))}
      </Spin>
    </Fragment>
  );
};
export default connect(
  ({ loading, texts }: { loading: any; texts: InitTextStateType }) => ({
    loadingTexts: !!loading.effects['texts/queryTexts'],
    texts: texts.texts,
  }),
)(Index);
