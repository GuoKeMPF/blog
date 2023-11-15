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
        margin: '10px'
      }}
    >
      {data.context}
    </p>
  );
};

let number = 1,
  preSetCellHeight = 50;
const Container: FC = () => {
  const [end, setEnd] = useState<Boolean>(true);

  const queryDate = async () => {
    const res = await loadMore({
      size: 10,
      number,
    });
    if (number > 3) {
      setEnd(false);
      return;
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
        hasNext={true}
        initList={[
          {
            "context": "text",
            "id": "42764bfbf4ad9c00",
            "height": 127.22985777144898,
            "color": "#b1fca1"
          },
          {
            "context": "text",
            "id": "1eb56ad1defe3b00",
            "height": 193.437671545149,
            "color": "#ffe87a"
          },
          {
            "context": "text",
            "id": "76168e714a2bb400",
            "height": 235.77958456649236,
            "color": "#2a28ee"
          },
          {
            "context": "text",
            "id": "247f92a7d7acf600",
            "height": 159.5839296698469,
            "color": "#38f6f0"
          },
          {
            "context": "text",
            "id": "7b7831711b453800",
            "height": 164.45878834550447,
            "color": "#21c33"
          },
          {
            "context": "text",
            "id": "12793e77b9fa2a0",
            "height": 104.51049860386918,
            "color": "#810b58"
          },
          {
            "context": "text",
            "id": "3a531c7247e50400",
            "height": 125.15205840389578,
            "color": "#ef7904"
          },
          {
            "context": "text",
            "id": "1c14b25246b04000",
            "height": 214.95285775396053,
            "color": "#fa1fb1"
          },
          {
            "context": "text",
            "id": "632a8460e3431000",
            "height": 269.59325279098954,
            "color": "#acc4e2"
          },
          {
            "context": "text",
            "id": "847ec1313a0fd800",
            "height": 271.13193307350787,
            "color": "#9ae3ee"
          }
        ]}
        preSetCellHeight={preSetCellHeight}
        onRenderCell={(data: any) => <Cell data={data} />}
      />
      <p>footer</p>
    </>
  );
};

export default Container;
