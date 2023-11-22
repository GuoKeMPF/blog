import React, { useState, useEffect, useRef, Fragment } from 'react';
import type { FC } from 'react';
import styles from './Visualization.less';

import IconFont from '@/components/IconFont';


import type { AudioStateType } from 'umi';
import RequestAnimation from '@/utils/requestAnimation';
import AudioAnalyser from '@/utils/audioAnalyser';

type PlayStatusProps = {
  loading: boolean;
  isPlay: boolean;
};

const PlayStatus: FC<PlayStatusProps> = ({ loading, isPlay }) => {;
  if (loading) {
    return (
      <Fragment>
        <IconFont type="loading"  spin />
      </Fragment>
    );
  } else {
    if (isPlay) {
      return (
        <Fragment>
          <IconFont type="pause" />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <IconFont type="play" />
        </Fragment>
      );
    }
  }
};

type VisualizationProps = {
  config: AudioStateType.AudioType;
  swithcAudio: (step: number) => void;
};

let audioAnalyser: AudioAnalyser | undefined;
let requestAnimation: RequestAnimation | undefined;
const fftSize = 1024;

const Visualization: FC<VisualizationProps> = ({ config, swithcAudio }) => {
  const { name } = config;
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [audioInfo, setAudioInfo] = useState<{
    list: Uint8Array;
    duration: number;
    currentTime: number;
  } | null>(null);
  const animFrame = () => {
    const list: Uint8Array =
      audioAnalyser?.getFrequencyData() || new Uint8Array();
    const audio_info = audioAnalyser?.getAudioInfo() || {
      duration: 0,
      currentTime: 0,
    };
    setAudioInfo({ list, ...audio_info });
  };

  const container = useRef<HTMLDivElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>();
  const [centerPointer, setCenterPointer] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  }>({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  });

  useEffect(() => {
    if (audioInfo) {
      drawCanvas(audioInfo);
    }
  }, [audioInfo]);

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
    setLoading(true);
    stop();
  }, []);

  useEffect(() => {
    stop();
    const { src, name } = config;
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
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => {
      window.removeEventListener('resize', initCanvas);
      stop();
    };
  }, []);

  const changeAudioStatus = () => {
    if (!isPlay) {
      start();
    } else {
      stop();
    }
    setIsPlay(!isPlay);
  };

  const onSwitchAudio = (step: number) => {
    swithcAudio(step);
  };

  // 初始化画布
  const initCanvas = () => {
    if (container && container.current && canvas && canvas.current) {
      const containerWidth = container.current.offsetWidth;
      canvas.current.height = containerWidth * 0.8;
      canvas.current.width = containerWidth;
      const c = canvas.current.getContext('2d');
      const centerPointer = {
        w: containerWidth,
        h: containerWidth * 0.8,
        x: containerWidth / 2,
        y: (containerWidth * 0.8) / 2,
      };
      setCenterPointer(centerPointer);
      setContext(c);
    }
  };

  const drawCanvas = (data: {
    currentTime: number;
    duration: number;
    list: Uint8Array;
  }) => {
    if (context) {
      const { w, h } = centerPointer;
      // 颜色参数
      const r = 255;
      const g = 255;
      const b = 255;
      const a = 255;
      context.clearRect(0, 0, w, h);
      context.save();
      context.beginPath();
      context.lineWidth = 3;
      context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      for (let i = 0; i < fftSize / 2; i += 1) {
        drawOuter(data.list, i);
        drawInner(data.list, i);
      }
      context.stroke();
      context.fill();
      context.beginPath();
      drawProgress(data);
      context.stroke();
      context.restore();
    }
  };

  /**
   * 绘制进度progress
   */
  const drawProgress = (data: { currentTime: number; duration: number }) => {
    if (context) {
      const rate = data.currentTime / data.duration;
      context.arc(
        centerPointer.x,
        centerPointer.y,
        160,
        -0.5 * Math.PI,
        Math.PI * rate * 2 - 0.5 * Math.PI,
        false,
      );
    }
  };

  /**
   * 绘制内圈 point
   */
  const drawInner = (array: Uint8Array, i: number) => {
    if (context) {
      let point;
      let value = 0;
      const { x, y } = centerPointer;
      if (i < 136) {
        point = i % 9 > 4 ? 9 - (i % 9) : i % 9;
        value = ((array[i] * 120) / 256) * ((5 - point) / 5);
        if (value > 50) {
          value = ((value - 50) * 120) / 50;
        } else {
          value = 0;
        }
      }
      context.moveTo(
        Math.sin(((i * 4) / 3 / 180) * Math.PI) * (150 - value) + x,
        Math.cos(((i * 4) / 3 / 180) * Math.PI) * (150 - value) + y,
      );
      context.arc(
        Math.sin(((i * 4) / 3 / 180) * Math.PI) * (150 - value) + x,
        Math.cos(((i * 4) / 3 / 180) * Math.PI) * (150 - value) + y,
        0.6,
        0,
        2 * Math.PI,
      );
      context.moveTo(
        -Math.sin(((i * 4) / 3 / 180) * Math.PI) * (150 - value) + x,
        Math.cos(((i * 4) / 3 / 180) * Math.PI) * (150 - value) + y,
      );
      context.arc(
        -Math.sin(((i * 4) / 3 / 180) * Math.PI) * (150 - value) + x,
        Math.cos(((i * 4) / 3 / 180) * Math.PI) * (150 - value) + y,
        0.6,
        0,
        2 * Math.PI,
      );
    }
  };

  /**
   * 绘制外圈 bar
   */
  const drawOuter = (array: Uint8Array, i: number) => {
    const { x, y } = centerPointer;
    if (context) {
      if (i > 130 && i < 271) {
        let value = (array[i] * 120) / 256;
        if (value > 10) {
          value = ((value - 10) * 120) / 100;
        } else {
          value = 0;
        }
        context.moveTo(
          Math.sin(((i * 4) / 3 / 180) * Math.PI) * 165 + x,
          Math.cos(((i * 4) / 3 / 180) * Math.PI) * 165 + y,
        );
        context.lineTo(
          Math.sin(((i * 4) / 3 / 180) * Math.PI) * (165 + value) + x,
          Math.cos(((i * 4) / 3 / 180) * Math.PI) * (165 + value) + y,
        );
        context.moveTo(
          -Math.sin(((i * 4) / 3 / 180) * Math.PI) * 165 + x,
          Math.cos(((i * 4) / 3 / 180) * Math.PI) * 165 + y,
        );
        context.lineTo(
          -Math.sin(((i * 4) / 3 / 180) * Math.PI) * (165 + value) + x,
          Math.cos(((i * 4) / 3 / 180) * Math.PI) * (165 + value) + y,
        );
      }
    }
  };
  return (
    <div>
      <div className={styles.container} ref={container}>
        <canvas className={styles.canvas} ref={canvas}></canvas>
        <div className={styles.controlBtn}>
          <p className={styles.audioName}>{name}</p>
          <div className={styles.buttonGroups}>
            <button
              className={styles.backward}
              onClick={() => onSwitchAudio(-1)}
            >
              <Fragment>
                <IconFont type="backward" />
              </Fragment>
            </button>
            <button
              className={styles.play}
              onClick={changeAudioStatus}
              disabled={loading}
            >
              <PlayStatus loading={loading} isPlay={isPlay} />
            </button>
            <button className={styles.forward} onClick={() => onSwitchAudio(1)}>
              <Fragment>
                <IconFont type="forward" />
              </Fragment>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;
