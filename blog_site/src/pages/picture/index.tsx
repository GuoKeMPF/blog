import React, { Fragment, createContext, useState, useEffect } from 'react';
import type { FC } from 'react';
import { connect } from 'umi';
import type { PictureStateType, Dispatch } from 'umi';

import Spin from '@/components/Spin';
import VirtualScroll from '@/components/VirtualScroll';
import ImageContainer from "./ImageContainer";
import ImageModal from "./ImageModal";
import styles from './index.less';


type PictureContextType = {
  visiable: boolean,
  setVisiable: (visiable: boolean) => void,
  select: any,
  setSelect: (d: any) => void,
}

export const PictureContext = createContext<PictureContextType>({
  visiable: false,
  setVisiable: (visiable: boolean) => { },
  select: undefined,
  setSelect: (d: any) => { },
});

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


  const [visiable, setVisiable] = useState<boolean>(false);
  const [select, setSelect] = useState<any>(undefined);


  useEffect(() => {
    return () => {
      dispatch({
        type: 'picture/reset',
      });
    };
  }, []);


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
      <PictureContext.Provider value={{ visiable, setVisiable, select, setSelect }}>
        <VirtualScroll
          loadDate={queryDate}
          end={total === pictures.length}
          preSetCellHeight={60}
          getCellHeight={(row, containerW = 0) => {
            const imgaeW = row.width || 0;
            if (imgaeW > containerW) {
              return row.height * containerW / imgaeW + 20
            } else {
              return row.height
            }
          }}
          cellClassName={styles.row}
          onRenderCell={(data: any) => (
            <Fragment>
              <ImageContainer src={data.src} alt={data?.name} data={data} />
            </Fragment>
          )}
        />
        <ImageModal />
      </PictureContext.Provider>
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
