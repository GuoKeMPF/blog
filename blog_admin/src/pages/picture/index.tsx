import { formColums } from '@/utils/layoutFrom';
import { DeleteOutlined, DownloadOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Card, Image, List, Popconfirm, Skeleton, Typography } from 'antd';
import { useEffect } from 'react';
import { connect } from 'umi';
import ImageForm from './ImageForm';

import errorImg from '@/assets/images/errorImg.png';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';

import type { ReactElement } from 'react';
import type { Dispatch, Loading, PictureStateType } from 'umi';

const { Paragraph } = Typography;
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
    console.log(p, s);

    dispatch({
      type: 'picture/queryPictures',
      payload: {
        page: p,
        size: s,
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
    <PageContainer>
      <Card
        title="图片"
        className={styles.pictures}
        extra={<Button onClick={onUpload}>新建</Button>}
      >
        <ImageForm />
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
                onChange: onChange,
              }}
              renderItem={(p: PictureStateType.PictureType) => (
                <List.Item>
                  <Card
                    hoverable
                    cover={
                      <Image
                        height={150}
                        fallback={errorImg}
                        className={styles.picture}
                        src={`${p.src}`}
                      />
                    }
                    actions={[
                      <a
                        href={`${p.src}`}
                        target="_blank"
                        key="download"
                        download={p.name}
                        rel="noreferrer"
                      >
                        <DownloadOutlined />
                      </a>,
                      <a href={`${p.src}`} target="_blank" key="open" rel="noreferrer">
                        <SendOutlined />
                      </a>,
                      <Paragraph key="copy" copyable={{ text: p.src }} />,
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
    </PageContainer>
  );
};
export default connect(({ picture, loading }: { picture: PictureStateType; loading: Loading }) => ({
  pictures: picture.pictures,
  loading: !!loading.effects['picture/queryPictures'],
  total: picture.total,
  size: picture.size,
  page: picture.page,
}))(Picture);
