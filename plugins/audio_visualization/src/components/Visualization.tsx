import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { FC } from 'react';
import { Button } from 'antd';
import { isBrowser } from 'umi';
import styles from './Visualization.less';

import RequestAnimation from '@/utils/requestAnimation';
import AudioAnalyser from '@/utils/audioAnalyser';

type VisualizationProps = {
  config: {
    src: string;
    name: string;
  };
};
const Visualization: FC<VisualizationProps> = ({ config }) => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const container = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [audioAnalyser, setAudioAnalyser] = useState<AudioAnalyser | null>(
    null,
  );

  const animFrame = () => {
    console.log(audioAnalyser?.getFrequencyData());
  };

  const requestAnimation = useMemo<RequestAnimation | undefined>(() => {
    if (requestAnimation) {
      requestAnimation.stop();
    }
    const r = new RequestAnimation({
      callback: animFrame,
    });
    return r;
  }, [audioAnalyser]);

  useEffect(() => {
    const { src, name } = config;
    setLoading(true);
    setAudioAnalyser(new AudioAnalyser({ src, onLoad: onLoad }));
    return () => {
      audioAnalyser?.suspend();
      requestAnimation?.stop();
    };
  }, [config]);

  useEffect(() => {
    if (isPlay) {
      audioAnalyser?.start();
      requestAnimation?.start();
    } else {
      audioAnalyser?.suspend();
      requestAnimation?.stop();
    }
  }, [isPlay, requestAnimation]);

  useEffect(() => {
    return () => {
      console.log('unmount');
      console.log(audioAnalyser, requestAnimation);
      audioAnalyser?.suspend();
      requestAnimation?.stop();
    };
  }, [audioAnalyser, requestAnimation]);

  const onLoad = () => {
    setLoading(false);
    if (isPlay) {
      audioAnalyser?.start();
      requestAnimation?.start();
    }
  };
  const changeAudioStatus = () => {
    setIsPlay(!isPlay);
  };

  return (
    <div>
      <div className={styles.container} ref={container}>
        <Button loading={loading} onClick={changeAudioStatus}>
          {isPlay ? '暂停' : '播放'}
        </Button>
      </div>
    </div>
  );
};

export default Visualization;
