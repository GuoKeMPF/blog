import { Fragment } from 'react';
import type { FC } from 'react';

import { Button } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

const { Group } = Button;

type OperationProps = {
  onPlayAll: () => void;
  disabled: boolean;
};
const Operation: FC<OperationProps> = ({ onPlayAll, disabled }) => {
  return (
    <Fragment>
      <Group>
        <Button onClick={onPlayAll} disabled={disabled} icon={<RedoOutlined />}>
          全部播放
        </Button>
        {/* <Button disabled={disabled} icon={<VerticalAlignBottomOutlined />}>全部下载</Button> */}
      </Group>
    </Fragment>
  );
};

export default Operation;
