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

/**
 * 
    audioAnalyser = useRef<AudioAnalyser | null>(
      new AudioAnalyser({ src: config.src, onLoad: onLoad }),
    );
    requestAnimation = useRef<RequestAnimation | undefined>(
      new RequestAnimation({
        callback: animFrame,
      }),
    );
 */
let audioAnalyser: AudioAnalyser | undefined;
let requestAnimation: RequestAnimation | undefined;
const Visualization: FC<VisualizationProps> = ({ config }) => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const container = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const animFrame = () => {};

  const start = () => {
    audioAnalyser?.start();
    requestAnimation?.start();
  };

  const onLoad = () => {
    setLoading(false);
    if (isPlay) {
      start();
    }
  };


  useEffect(() => {
    const { src, name } = config;
    console.log(src, name);
    setLoading(true);
    stop();
    audioAnalyser = new AudioAnalyser({ src, onLoad: onLoad });
    requestAnimation = new RequestAnimation({
      callback: animFrame,
    });
  }, []);

  useEffect(() => {
    stop();
    const { src, name } = config;
    console.log(src, name);
    setLoading(true);
    audioAnalyser = new AudioAnalyser({ src, onLoad: onLoad });
    requestAnimation = new RequestAnimation({
      callback: animFrame,
    });
  }, [config]);

  function stop() {
    audioAnalyser?.suspend();
    requestAnimation?.stop();
  }

  useEffect(() => {
    return () => {
      console.log('unmount');
      stop();
    };
  }, []);

  const changeAudioStatus = () => {
    console.log(!isPlay);
    if (!isPlay) {
      start();
    } else {
      stop();
    }
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
