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
  onReset: () => void;
  onSwitch: (step: 1 | -1) => void;
};

const Player: FC<PlayerProps> = ({ src, name, onReset, onSwitch }) => {
  const audio = useRef<HTMLAudioElement>(null);
  const [play, setPlay] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const onLoad = () => {
    console.log('onLoad');
    setLoading(false);
    setLoadingError(false);
    audio.current?.play();
  };

  const onError = () => {
    setLoadingError(true);
    setLoading(false);
  };

  const onProgress = (e: any) => {
    const precent = (e.target.currentTime / e.target.duration) * 100;
    setProgress(precent);
  };

  useEffect(() => {
    if (audio.current && src) {
      audio.current.src = src;
      setLoading(true);
      audio.current.preload = 'auto';
      audio.current.oncanplay = onLoad;
      audio.current.onerror = onError;
      audio.current.ontimeupdate = onProgress;
    }
  }, [src, name]);

  const onPlay = () => {
    audio.current?.play();
  };

  const onStop = () => {
    audio.current?.pause();
    onReset();
    setProgress(0);
  };

  const onPause = () => {
    audio.current?.pause();
  };

  const onBackward = () => {
    onSwitch(-1);
  };

  const onForward = () => {
    onSwitch(1);
  };

  return (
    <Fragment>
      <Group>
        <Button onClick={onBackward}>
          <BackwardOutlined />
        </Button>
        <Button onClick={onPlay}>
          <CaretRightOutlined />
        </Button>
        <Button onClick={onPause}>
          <PauseOutlined />
        </Button>
        <Button onClick={onStop}>
          <BorderOutlined />
        </Button>
        <Button onClick={onForward}>
          <ForwardOutlined />
        </Button>
      </Group>
      {src && (
        <div className={styles.audioContainer}>
          <p className={styles.name}>{name || '--'}</p>
          <Slider value={progress} />
          <div className={styles.audio}>
            <audio src={src} ref={audio} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Player;
