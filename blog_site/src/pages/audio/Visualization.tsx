import React, { useState, useEffect, useRef } from 'react';
import type { FC } from "react";
import styles from './Visualization.less';



type VisualizationProps = {
  config: {
    src: string,
    name: string,
  }
}
const Visualization: FC<VisualizationProps> = ({ config }) => {

  const { src, name } = config

  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio());
  const container = useRef<HTMLDivElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>();
  const [rAnimation, setRAnimation] = useState<number>(0)
  const [centerPointer, setCenterPointer] = useState<{ x: number, y: number, w: number, h: number }>({
    x: 0, y: 0, w: 0, h: 0
  })




  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => {
      window.removeEventListener('resize', initCanvas);
      window.cancelAnimationFrame(rAnimation);
    }
  }, []);
  useEffect(() => {
    if (isPlay) {
      audio.pause();
    } else {
      audio.play();
    }
  }, [isPlay])

  useEffect(() => {
    if (context) {
      playMusic(audio)
    }
  }, [context])


  const changeAudioStatus = () => {
    setIsPlay(!isPlay)
  };


  useEffect(() => {
    initAudio();
  }, [src])

  // 初始化音频信息
  const initAudio = () => {
    // 初始化音频
    const { src } = config;
    audio.src = src;
    audio.preload = 'auto';
    audio.autoplay = false;
    const AudioContext = window.AudioContext;
    setAudio(audio);
    if (!AudioContext) {
      console.error('您的浏览器不支持audio API，请更换浏览器（chrome、firefox）再尝试');
    }
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


  // 设置音频相关配置
  const playMusic = (arg: HTMLAudioElement) => {
    let source;
    let audioSource;
    let bufferSource: AudioBufferSourceNode;
    // 如果arg是audio的dom对象，则转为相应的源
    const AC = new AudioContext();
    // analyser为analysernode，具有频率的数据，用于创建数据可视化
    const analyser = AC.createAnalyser();
    analyser.fftSize = 1024;
    // gain为gainNode，音频的声音处理模块
    const gainnode = AC.createGain();
    gainnode.gain.value = 1;
    if (arg.nodeType) {
      audioSource = audioSource || AC.createMediaElementSource(arg);
      source = audioSource;
    } else {
      bufferSource = AC.createBufferSource();
      bufferSource.buffer = arg;
      // 播放音频
      setTimeout(() => {
        bufferSource.start();
      }, 0);
      source = bufferSource;
    }
    visualizer(analyser);
    // 连接analyserNode
    source.connect(analyser);
    // 再连接到gainNode
    analyser.connect(gainnode);
    // 最终输出到音频播放器
    gainnode.connect(AC.destination);
  };


  // 音频序列化
  const visualizer = (analyser: AnalyserNode) => {
    // 0 ~ 255 之间的值
    const arrayLength = analyser.frequencyBinCount;
    const array = new Uint8Array(arrayLength);
    //  -1 ~ 1 之间的值
    // const waveform = new Float32Array(arrayLength)
    const requestAnimationFrame = window.requestAnimationFrame
    const v = () => {
      analyser.getByteFrequencyData(array);
      // analyser.getFloatTimeDomainData(waveform);
      const audioInfo = {
        list: array,
        allTime: audio.duration || 0,
        currentTime: audio.currentTime || 0,
      };
      drawCanvas(audioInfo);
      const r = requestAnimationFrame(v);
      setRAnimation(r);
    };

    const r = requestAnimationFrame(v);
    setRAnimation(r);


  };

  const drawCanvas = (data: { currentTime: number; allTime: number; list: Uint8Array; }) => {

    if (context) {
      const { w, h } = centerPointer;
      const rate = data.currentTime / data.allTime;
      // 颜色参数
      const r = (1 - rate) * 255;
      const g = 0;
      const b = rate * 255;
      const a = 0.7;
      context.clearRect(0, 0, w, h);
      context.save();
      context.beginPath();
      context.lineWidth = 3;
      context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      for (let i = 0; i < 512; i += 1) {
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
  const drawProgress = (data: { currentTime: number; allTime: number; }) => {
    if (context) {
      const rate = data.currentTime / data.allTime;
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




  return <div>
    <div
      className={styles.container}
      ref={container}
    >
      <canvas
        className={styles.canvas}
        ref={canvas}
      ></canvas>
      <div className={styles.controlBtn}>
        <p className={styles.audioName}>{name}</p>
        <div className={styles.progress}>
        </div>
        <p onClick={changeAudioStatus}>
          {isPlay ? '暂停' : '播放'}
        </p>
      </div>
    </div>
  </div>
}

export default Visualization
