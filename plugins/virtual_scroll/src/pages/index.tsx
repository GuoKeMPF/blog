import { useState, Fragment } from 'react';
import type { FC } from 'react';
import styles from './index.less';
import { loadMore } from './service';

import VirtualScroll from '@/components/virtual-scroll';

type CellProps = {
  data: any;
};
const Cell: FC<CellProps> = ({ data }) => {
  return (
    <p
      className={styles.text}
      style={{
        backgroundColor: data.color,
        height: data.height,
      }}
    >
      {data.context}
    </p>
  );
};

let number = 1,
  preSetCellHeight = 50;
const Container: FC = () => {
  const [hasNext, setHasNext] = useState<Boolean>(true);

  const queryDate = async () => {
    const res = await loadMore({
      size: 10,
      number,
    });
    if (number > 3) {
      setHasNext(false);
      return [];
    }
    number++;
    const { data }: { data: any[] } = res;
    return data;
  };

  return (
    <>
      <p>header</p>
      <VirtualScroll
        loadMoreData={queryDate}
        hasNext={hasNext}
        initList={[
          {
            context: 'text',
            id: '42764bfbf4ad9c00',
            height: 127.22985777144898,
            color: '#b1fca1',
          },
        ]}
        preSetCellHeight={preSetCellHeight}
        onRenderCell={(data: any) => <Cell data={data} />}
      />
      <p>footer</p>
    </>
  );
};

export default Container;
