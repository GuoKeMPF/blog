import { Fragment, useState, useEffect, useRef } from 'react';
import type { FC } from 'react';

import { Button, Slider } from 'antd';
import {
  BackwardOutlined,
  BorderOutlined,
  CaretRightOutlined,
  ForwardOutlined,
  PauseOutlined,
} from '@ant-design/icons';

import styles from './Player.less';

const { Group } = Button;

type PlayerProps = {
  src: string | undefined;
  name: string | undefined;
};

const Player: FC<PlayerProps> = ({ src, name }) => {
  const audio = useRef<HTMLAudioElement>(null);
  const [play, setPlay] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const onLoad = () => {
    setLoading(false);
    setLoadingError(false);
  };

  const onError = () => {
    setLoadingError(true);
    setLoading(false);
  };

  useEffect(() => {
    if (audio.current && src) {
      audio.current.src = src;
      setLoading(true);
      audio.current.onload = onLoad;
      audio.current.onerror = onError;
    }
  }, [src, name]);

  const onPlay = () => {
    audio.current?.play();
  };

  const onStop = () => {};

  const onPause = () => {};

  const onBackward = () => {};

  const onForward = () => {};

  return (
    <Fragment>
      <Group>
        <Button>
          <BackwardOutlined />
        </Button>
        <Button onClick={onPlay}>
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
      <div className={styles.audioContainer}>
        <p className={styles.name}>{name || '--'}</p>
        <Slider defaultValue={progress} />
        <div className={styles.audio}>
          <audio src={src} ref={audio} />
        </div>
      </div>
    </Fragment>
  );
};

export default Player;
