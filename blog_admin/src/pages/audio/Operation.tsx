import { Fragment } from 'react';
import type { FC } from 'react';

import { Button } from 'antd';
import { RedoOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';

const { Group } = Button;

const Operation: FC = () => {
  return (
    <Fragment>
      <Group>
        <Button icon={<RedoOutlined />}>全部播放</Button>
        <Button icon={<VerticalAlignBottomOutlined />}>全部下载</Button>
      </Group>
    </Fragment>
  );
};

export default Operation;
