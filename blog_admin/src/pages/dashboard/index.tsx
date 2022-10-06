import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { connect } from 'umi';

import TextCard from './textCard';
import DraftCard from './draftCard';
import PictureCard from './pictureCard';
import AudioCard from './audioCard';
import Charts from './charts';

import DockLayout from 'rc-dock';
import 'rc-dock/dist/rc-dock.css';

import type { DashboardModelState, Dispatch } from 'umi';

import type { ReactElement } from 'react';

const Dashboard = ({
  dispatch,
  dashboard,
  loading,
}: {
  dashboard: DashboardModelState;
  dispatch: Dispatch;
  loading: boolean;
}): ReactElement => {
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'dashboard/getDashboard',
        payload: {},
      });
    }
  }, [dispatch]);

  const layout = {
    dockbox: {
      mode: 'vertical',
      children: [
        {
          mode: 'horizontal',
          id: 'summary',
          size: 120,
          children: [
            {
              tabs: [
                {
                  content: <DraftCard />,
                  closable: true,
                  id: 'draft',
                  title: '草稿',
                  minWidth: 150,
                  minHeight: 150,
                },
              ],
            },
            {
              tabs: [
                {
                  content: <TextCard />,
                  closable: true,
                  id: 'text',
                  title: '文字',
                  minWidth: 150,
                  minHeight: 150,
                },
              ],
            },
            {
              tabs: [
                {
                  content: <PictureCard />,
                  closable: true,
                  id: 'picture',
                  title: '图片',
                  minWidth: 150,
                  minHeight: 150,
                },
              ],
            },
            {
              tabs: [
                {
                  content: <AudioCard />,
                  closable: true,
                  id: 'audio',
                  title: '音频',
                  minWidth: 150,
                  minHeight: 150,
                },
              ],
            },
          ],
        },
        {
          size: 600,
          tabs: [
            {
              closable: true,
              id: 't3',
              title: '统计',
              content: <Charts loading={loading} chartData={dashboard} />,
              minWidth: 300,
              minHeight: 250,
            },
          ],
        },
      ],
    },
  };

  return (
    <PageContainer>
      <DockLayout
        defaultLayout={layout}
        style={{
          height: 600,
        }}
      />
    </PageContainer>
  );
};

export default connect(({ dashboard }: { dashboard: DashboardModelState }) => ({
  dashboard,
}))(Dashboard);
