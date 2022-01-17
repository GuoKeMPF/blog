import { Fragment, useEffect } from 'react';
import { Skeleton, Card, Button, Image, Col, Row, Popconfirm } from 'antd';
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { formLayout } from '@/utils/layoutFrom';
import ImageForm from './ImageForm';

import styles from './index.less';
import errorImg from '@/assets/images/errorImg.png';
import { prefix } from '@/utils/prefix';

import type { ReactElement } from 'react';
import type { PictureStateType, Dispatch, Loading } from 'umi';

const { Meta } = Card;

const Picture = ({
  pictures,
  dispatch,
  loading,
}: {
  pictures: PictureStateType.PictureTypes;
  dispatch: Dispatch;
  loading: boolean;
}): ReactElement => {
  useEffect(() => {
    dispatch({
      type: 'picture/queryPictures',
    });
  }, [dispatch]);

  const onUpload = () => {
    dispatch({
      type: 'picture/setVisiable',
      payload: {
        visiable: true,
      },
    });
  };

  const onDelete = (picture: PictureStateType.PictureType) => {
    dispatch({
      type: 'picture/deletePicture',
      payload: {
        id: picture.id,
      },
    });
  };

  return (
    <Fragment>
      <ImageForm />
      <Card title="图片" extra={<Button onClick={onUpload}>新建</Button>}>
        <Skeleton loading={loading} active>
          <Row gutter={[16, 16]}>
            <Image.PreviewGroup>
              {pictures.map((p: PictureStateType.PictureType) => (
                <Col {...formLayout(24, 24, 12, 8, 6, 4)} key={p.id}>
                  <Card
                    hoverable
                    cover={
                      <Image
                        fallback={errorImg}
                        className={styles.picture}
                        src={`${prefix}${p.src}`}
                      />
                    }
                    actions={[
                      <a
                        href={`${prefix}${p.src}`}
                        target="_blank"
                        key="download"
                        download={p.name}
                        rel="noreferrer"
                      >
                        <DownloadOutlined />
                      </a>,
                      <Popconfirm
                        key="delete"
                        title="是否确认删除当前图片？"
                        onConfirm={() => onDelete(p)}
                        okText="是"
                        cancelText="否"
                      >
                        <Button type="link" danger>
                          <DeleteOutlined />
                        </Button>
                      </Popconfirm>,
                    ]}
                  >
                    <Meta title={p.name} description={<span>上传时间：{p.create_time}</span>} />
                  </Card>
                </Col>
              ))}
            </Image.PreviewGroup>
          </Row>
        </Skeleton>
      </Card>
    </Fragment>
  );
};
export default connect(({ picture, loading }: { picture: PictureStateType; loading: Loading }) => ({
  pictures: picture.pictures,
  loading: !!loading.effects['picture/queryPictures'],
}))(Picture);
