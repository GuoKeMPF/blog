import { FC, Fragment, useEffect } from 'react';
import Spin from '@/components/Spin';
import { Dispatch, InitTextStateType, TextsType, connect } from 'umi';
import TextItem from './TextItem';

interface PageProps {
  dispatch: Dispatch;
  loadingTexts: boolean;
  texts: TextsType[];
}

const Index: FC<PageProps> = ({ dispatch, loadingTexts, texts }) => {
  useEffect(() => {
    dispatch({
      type: 'texts/queryTexts',
    });
  }, []);

  return (
    <Fragment>
      <Spin loading={loadingTexts}>
        {texts.map((item) => (
          <TextItem key={item.id} text={item} />
        ))}
      </Spin>
    </Fragment>
  );
};
export default connect(
  ({ loading, texts }: { loading: any; texts: InitTextStateType }) => ({
    loadingTexts: !!loading.effects['texts/queryTexts'],
    texts: texts.texts,
  }),
)(Index);
