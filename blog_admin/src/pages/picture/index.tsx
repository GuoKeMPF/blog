import { ReactElement, useEffect } from 'react';
import { Skeleton, Card, Button, Image } from 'antd';
import { connect } from 'umi';
import type { PictureStateType, Dispatch, Loading } from 'umi';
import { formColums } from '@/utils/layoutFrom';

const Picture = ({
  pictures,
  dispatch,
  loading,
}: {
  drafts: PictureStateType.PictureTypes;
  dispatch: Dispatch;
  loading: boolean;
}): ReactElement => {
  useEffect(() => {
    dispatch({
      type: 'picture/queryPictures',
    });
  }, []);

  const addDraft = () => {
    dispatch({
      type: 'draft/toEdit',
      payload: {},
    });
  };

  return (
    <Card title="图片" extra={<Button onClick={addDraft}>新建</Button>}>
      <Skeleton loading={loading} active>
        <Image.PreviewGroup>
          <Image
            width={200}
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          />
        </Image.PreviewGroup>
      </Skeleton>
    </Card>
  );
};
export default connect(({ picture, loading }: { picture: PictureStateType; loading: Loading }) => ({
  pictures: picture.pictures,
  loading: !!loading.effects['picture/queryPictures'],
}))(Picture);
