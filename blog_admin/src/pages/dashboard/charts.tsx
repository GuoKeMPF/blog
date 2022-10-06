import React, { useState, useEffect, useMemo } from 'react';
import type { FC } from 'react';
import { Card } from 'antd';
import { Mix } from '@ant-design/plots';

import { connect } from 'umi';
import styles from './charts.less';
import type { DashboardModelState, Loading } from 'umi';

type ChartsProps = {
  loading: boolean;
  dashboard: {
    draft: number;
    text: number;
    picture: number;
    audio: number;
  };
};

const Charts: FC<ChartsProps> = ({ dashboard, loading }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const s = [
      {
        title: '草稿箱',
        count: dashboard.draft,
      },
      {
        title: '说说',
        count: dashboard.text,
      },
      {
        title: '图片',
        count: dashboard.picture,
      },
      {
        title: '音频',
        count: dashboard.audio,
      },
    ];
    setData(s);
  }, [dashboard]);

  const config = useMemo(() => {
    return {
      tooltip: false,
      height: '100%',
      legend: {},
      plots: [
        {
          type: 'pie',
          region: {
            start: {
              x: 0,
              y: 0,
            },
            end: {
              x: 0.5,
              y: 1,
            },
          },
          options: {
            data: data,
            angleField: 'count',
            colorField: 'title',
            tooltip: {
              showMarkers: false,
            },
            radius: 0.85,
            label: {
              type: 'inner',
              formatter: '{name}',
              offset: '-15%',
            },
            interactions: [
              {
                type: 'element-active',
              },
            ],
          },
        },
        {
          type: 'column',
          region: {
            start: {
              x: 0.5,
              y: 0,
            },
            end: {
              x: 1,
              y: 1,
            },
          },
          options: {
            data,
            xField: 'title',
            yField: 'count',
            colorField: 'title',
            label: {
              position: 'middle',
              offset: '-15%',
            },
            xAxis: {
              label: {
                autoHide: true,
                autoRotate: true,
              },
            },
            meta: {
              title: {
                alias: '类别',
              },
              count: {
                alias: '数量',
              },
            },
          },
        },
      ],
    };
  }, [data]);

  return (
    <Card loading={loading} className={styles.card}>
      <Mix {...config} />
    </Card>
  );
};
const ConnectFC = connect(
  ({ dashboard, loading }: { dashboard: DashboardModelState; loading: Loading }) => ({
    dashboard,
    loading: loading.effects['dashboard/getDashboard'],
  }),
)(Charts);

export default ConnectFC;
