import { FC, Fragment, useEffect, useState } from 'react';
import Spin from '@/components/Spin';
import { useLocation, useHistory, connect } from 'umi';
import Pagination from '@/components/Pagination';
import type { Dispatch, InitTextStateType, TextsType, Location } from 'umi';
import TextItem from './TextItem';
import styles from './index.less';

interface PageProps {
  dispatch: Dispatch;
  loadingTexts: boolean;
  texts: TextsType[];
}

const Index: FC<PageProps> = ({ dispatch, loadingTexts, texts }) => {
  const location: Location = useLocation();
  const history = useHistory();
  const { page = 1 } = location?.query ?? {};

  useEffect(() => {
    dispatch({
      type: 'texts/queryTexts',
      payload: {
        // size,
        page,
      },
    });
  }, [page]);

  const changePage = (value: string | number) => {
    console.log(value);
    history.push({
      pathname: 'texts',
      search: `?page=${value}`,
    });
  };

  return (
    <Spin loading={loadingTexts}>
      <Fragment>
        <Pagination page={page} total={100} onChange={changePage} />
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
      </Fragment>
    </Spin>
  );
};
export default connect(
  ({ loading, texts }: { loading: any; texts: InitTextStateType }) => ({
    loadingTexts: !!loading.effects['texts/queryTexts'],
    texts: texts.texts,
  }),
)(Index);
