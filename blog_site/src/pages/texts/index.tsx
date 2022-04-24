import { FC, Fragment, useEffect, useState } from 'react';
import Spin from '@/components/Spin';

import VirtualScroll from '@/components/VirtualScroll';
import { connect } from 'umi';
import type { InitTextStateType, Dispatch, TextsType } from 'umi';
import TextItem from './TextItem';
import styles from './index.less';

interface PageProps {
  dispatch: Dispatch;
  loadingTexts: boolean;
  texts: TextsType[];
  total: number | undefined;
}

const Index: FC<PageProps> = ({ dispatch, loadingTexts, texts, total }) => {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    return () => {
      dispatch({
        type: 'texts/reset',
      });
    };
  }, []);
  const queryDate = async () => {
    const p = page;
    const res = await dispatch({
      type: 'texts/queryTexts',
      payload: {
        // size,
        page,
      },
    });
    setPage(p + 1);
    return res;
  };

  return (
    <Spin loading={loadingTexts}>
      <div className={styles.container}>
        <VirtualScroll
          loadDate={queryDate}
          end={total === texts.length}
          preSetCellHeight={60}
          cellClassName={styles.row}
          onRenderCell={(data: any) => (
            <Fragment>
              <div className={styles.line}>
                <div className={styles.index}></div>
              </div>
              <div className={styles.texts}>
                <TextItem text={data} />
              </div>
            </Fragment>
          )}
        />
      </div>
    </Spin>
  );
};

const ConnectIndex = connect(
  ({ loading, texts }: { loading: any; texts: InitTextStateType }) => ({
    loadingTexts: !!loading.effects['texts/queryTexts'],
    texts: texts.texts,
    total: texts.total,
  }),
)(Index);

export default ConnectIndex