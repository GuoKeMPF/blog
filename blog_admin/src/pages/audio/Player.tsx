import { Fragment } from 'react';
import type { FC } from 'react';

import { Button } from 'antd';
import {
  BackwardOutlined,
  BorderOutlined,
  CaretRightOutlined,
  ForwardOutlined,
  PauseOutlined,
} from '@ant-design/icons';

const { Group } = Button;

type PlayerProps = {
  src: string | undefined;
  name: string | undefined;
};

const Player: FC<PlayerProps> = () => {
  return (
    <Fragment>
      <Group>
        <Button>
          <BackwardOutlined />
        </Button>
        <Button>
          <CaretRightOutlined />
        </Button>
        <Button>
          <PauseOutlined />
        </Button>
        <Button>
          <BorderOutlined />
        </Button>
        <Button>
          <ForwardOutlined />
        </Button>
      </Group>
    </Fragment>
  );
};

export default Player;
