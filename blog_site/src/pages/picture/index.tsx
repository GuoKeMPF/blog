import React, { Fragment, useEffect, useState } from 'react';
import type { FC } from 'react';

import Spin from '@/components/Spin';

import VirtualScroll from '@/components/VirtualScroll';
import { connect } from 'umi';
import type { PictureStateType, Dispatch } from 'umi';
import styles from './index.less';

interface PageProps {
  dispatch: Dispatch;
  loadingPictures: boolean;
  pictures: PictureStateType.PictureType[];
  total: number | undefined;
}

const Picture: FC<PageProps> = ({
  dispatch,
  total,
  pictures,
  loadingPictures,
}) => {
  const [page, setPage] = useState<number>(1);

  const queryDate = async () => {
    const p = page;
    const res = await dispatch({
      type: 'picture/queryPictures',
      payload: {
        // size,
        page,
      },
    });
    setPage(p + 1);
    return res;
  };

  return (
    <Spin loading={loadingPictures}>
      <div className={styles.container}>
        <VirtualScroll
          loadDate={queryDate}
          end={total === pictures.length}
          preSetCellHeight={60}
          cellClassName={styles.row}
          onRenderCell={(data: any) => (
            <Fragment>
              <img src={data.src} alt={data?.name} />
            </Fragment>
          )}
        />
      </div>
    </Spin>
  );
};

const ConnectPicture = connect(
  ({ loading, picture }: { loading: any; picture: PictureStateType }) => ({
    loadingPictures: !!loading.effects['picture/queryPictures'],
    pictures: picture.pictures,
    total: picture.total,
  }),
)(Picture);

export default ConnectPicture;
