import { Fragment, useEffect } from 'react';
import { Skeleton, Card, Button, Image, Popconfirm, List } from 'antd';
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { formColums } from '@/utils/layoutFrom';
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
  total,
  size,
  page,
}: {
  pictures: PictureStateType.PictureTypes;
  dispatch: Dispatch;
  loading: boolean;
  total: number;
  size: number;
  page: number;
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


  const onChange = (p: number, s: number) => {
    console.log(p,s);
    
    dispatch({
      type: 'picture/queryPictures',
      payload: {
        page: p, size: s
      }
    });
  }

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
      <Card
        title="图片"
        className={styles.pictures}
        extra={<Button onClick={onUpload}>新建</Button>}
      >
        <Skeleton loading={loading} active>
          <Image.PreviewGroup>
            <List
              grid={{ gutter: 16, ...formColums(1, 1, 2, 3, 4, 6) }}
              dataSource={pictures}
              pagination={{
                position: 'both',
                size: 'small',
                showSizeChanger: true,
                total,
                pageSize: size,
                current: page,
                onChange: onChange
              }}
              renderItem={(p: PictureStateType.PictureType) => (
                <List.Item>
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
                </List.Item>
              )}
            />
          </Image.PreviewGroup>
        </Skeleton>
      </Card>
    </Fragment>
  );
};
export default connect(({ picture, loading }: { picture: PictureStateType; loading: Loading }) => ({
  pictures: picture.pictures,
  loading: !!loading.effects['picture/queryPictures'],
  total: picture.total,
  size: picture.size,
  page: picture.page,
}))(Picture);
