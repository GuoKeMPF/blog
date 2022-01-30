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
  total: number;
}

const Index: FC<PageProps> = ({ dispatch, loadingTexts, texts, total }) => {
  const location: Location = useLocation();
  const history = useHistory();
  const page = location?.query?.page?.toString() ?? '1';

  useEffect(() => {
    dispatch({
      type: 'texts/queryTexts',
      payload: {
        // size,
        page,
      },
    });
  }, [page]);

  const changePage = (value: string) => {
    history.push({
      pathname: 'texts',
      search: `?page=${value}`,
    });
  };

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
      <Pagination
        disable={loadingTexts}
        page={page}
        total={total}
        onChange={changePage}
        position="center"
      />
    </Fragment>
  );
};
export default connect(
  ({ loading, texts }: { loading: any; texts: InitTextStateType }) => ({
    loadingTexts: !!loading.effects['texts/queryTexts'],
    texts: texts.texts,
    total: texts.total,
  }),
)(Index);
