import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { FC } from "react";
import { isBrowser } from "umi";
import styles from './Visualization.less';



type VisualizationProps = {
  config: {
    src: string,
    name: string,
  }
}
const Visualization: FC<VisualizationProps> = ({ config }) => {

  const { src, name } = config;
  const fftSize = 1024

  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [source, setSource] = useState<AudioBufferSourceNode | null>(null);

  const audioCtx = useMemo((): AudioContext | undefined => {
    if (isBrowser()) {
      return new AudioContext()
    }
    return
  }, [])
  const [rAnimation, setRAnimation] = useState<number>(0);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [audioInfo, setAudioInfo] = useState<{ list: Uint8Array, duration: number, currentTime: number } | null>(null)
  const [firstPlay, setFirstPlay] = useState(true);
  const [buffer, setBuffer] = useState<AudioBuffer | null>(null)



  const container = useRef<HTMLDivElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>();
  const [centerPointer, setCenterPointer] = useState<{ x: number, y: number, w: number, h: number }>({
    x: 0, y: 0, w: 0, h: 0
  })


  useEffect(() => {
    if (audioInfo) {
      drawCanvas(audioInfo);
    }
  }, [audioInfo])



  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => {
      window.removeEventListener('resize', initCanvas);
      window.cancelAnimationFrame(rAnimation);
    }
  }, []);

  useEffect(() => {
    audioCtx?.suspend().then(function () {
      console.log('Resume context');
    });
    setAudioInfo(null);
    setBuffer(null)
    loadAudio()
  }, [config]);




  useEffect(() => {
    if (source) {
      if (isPlay) {
        setFirstPlay(false);
        try {
          source.start(0)
        } catch (error) {

        }
        audioCtx?.resume().then(function () {
          console.log('Suspend context');
        });
        if (analyser) {
          visualizer(analyser)
        }
      } else {
        audioCtx?.suspend().then(function () {
          console.log('Resume context');
        });
        window.cancelAnimationFrame(rAnimation)
      }
    }
  }, [isPlay])

  useEffect(() => {
    if (buffer) {
      connectAudio();
    }
  }, [buffer])


  const decode = async (arraybuffer: ArrayBuffer) => {
    try {
      const res: AudioBuffer | undefined = await audioCtx?.decodeAudioData(arraybuffer);
      return res
    } catch (error) {
      console.log(error);
    }
  }

  const loadAudio = async () => {

    const xhr = new XMLHttpRequest();
    xhr.abort();
    xhr.open("GET", src);
    xhr.responseType = "arraybuffer";

    xhr.onload = async () => {
      const audioData = xhr.response;
      const b = await decode(audioData);
      if (b) {
        setBuffer(b)
      }
    }
    xhr.send();
  }

  const connectAudio = async () => {
    if (source) {
      try {
        source.stop();
      } catch (error) {
        console.log(error);
      }
    }
    if (audioCtx) {
      const analys = audioCtx.createAnalyser();
      const distortion = audioCtx.createWaveShaper();
      const gainNode = audioCtx.createGain();
      const biquadFilter = audioCtx.createBiquadFilter();
      const audioSpurce = audioCtx.createBufferSource();
      audioSpurce.buffer = buffer;
      audioSpurce.connect(audioCtx.destination);
      audioSpurce.loop = true;
      analys.fftSize = fftSize;
      analys.connect(audioCtx.destination);

      audioSpurce.connect(analys);
      analys.connect(distortion);
      distortion.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(audioCtx.destination)
      if (!firstPlay) {
        audioCtx.resume().then(function () {
          console.log('Suspend context');
        });
        audioSpurce.start(0);
        visualizer(analys)
      }
      setSource(audioSpurce);
      setAnalyser(analys);
    }
  }



  // 音频序列化
  const visualizer = (analyser: AnalyserNode) => {
    const requestAnimationFrame = window.requestAnimationFrame
    const v = () => {
      const arrayLength = analyser.frequencyBinCount;
      const array = new Uint8Array(arrayLength);
      analyser.getByteFrequencyData(array);
      const duration = buffer?.duration || 0;
      console.log(buffer);
      console.log(analyser);



      const audio_info = {
        list: array,
        duration,
        currentTime: analyser.context.currentTime || 0
      };
      setAudioInfo(audio_info)
      const r = requestAnimationFrame(v);
      setRAnimation(r);
    };

    requestAnimationFrame(v);
  };


  const changeAudioStatus = () => {
    setIsPlay(!isPlay)
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

  const drawCanvas = (data: { currentTime: number; duration: number; list: Uint8Array; }) => {
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
  const drawProgress = (data: { currentTime: number; duration: number; }) => {
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
        <button onClick={changeAudioStatus}>
          {isPlay ? '暂停' : '播放'}
        </button>
      </div>
    </div>
  </div>
}

export default Visualization
