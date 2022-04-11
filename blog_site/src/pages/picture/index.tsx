import React, { Fragment, useEffect, useState } from 'react';
import type { FC } from 'react';
import { connect } from 'umi';
import type { PictureStateType, Dispatch } from 'umi';


import Spin from '@/components/Spin';

import VirtualScroll from '@/components/VirtualScroll';

import ImageContainer from "./ImageContainer";


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
    if (res) {
      setPage(p + 1);
      return res;
    }
  };

  return (
    <Spin loading={loadingPictures}>
      <VirtualScroll
        loadDate={queryDate}
        end={total === pictures.length}
        preSetCellHeight={60}
        getCellHeight={(row) => row.height}
        cellClassName={styles.row}
        onRenderCell={(data: any) => (
          <Fragment>
            <ImageContainer src={data.src} alt={data?.name}/>
          </Fragment>
        )}
      />
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
