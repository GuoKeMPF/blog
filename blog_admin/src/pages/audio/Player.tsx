import { Fragment, useState, useEffect, useRef } from 'react';
import type { FC } from 'react';

import { Button, Slider } from 'antd';
import {
  BackwardOutlined,
  BorderOutlined,
  CaretRightOutlined,
  ForwardOutlined,
  PauseOutlined,
  SoundOutlined,
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
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const [volume, setVolume] = useState<number>(60);

  const onLoad = () => {
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

  const onEnd = () => {
    onSwitch(1);
  };

  useEffect(() => {
    if (audio.current && src) {
      audio.current.src = src;
      setLoading(true);
      audio.current.preload = 'auto';
      audio.current.oncanplay = onLoad;
      audio.current.onerror = onError;
      audio.current.ontimeupdate = onProgress;
      audio.current.onended = onEnd;
      audio.current.volume = volume / 100;
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

  const onChangeProgress = (value: number) => {
    if (audio.current) {
      const currentTime = (audio.current.duration * value) / 100;
      audio.current.currentTime = currentTime;
      setProgress(value);
    }
  };

  const onChangeVolume = (value: number) => {
    if (audio.current) {
      audio.current.volume = value / 100;
      setVolume(value);
    }
  };

  return (
    <Fragment>
      <Group>
        <Button onClick={onBackward}>
          <BackwardOutlined />
        </Button>
        <Button onClick={onPlay} loading={loading} disabled={loadingError}>
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
          <div className={styles.info}>
            <div className={styles.name}>{name || '--'}</div>
            <div className={styles.volume}>
              <span>
                <SoundOutlined />
              </span>
              <Slider className={styles.volumeSlider} value={volume} onChange={onChangeVolume} />
            </div>
          </div>
          <Slider value={progress} onChange={onChangeProgress} />
          <div className={styles.audio}>
            <audio src={src} ref={audio} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Player;
