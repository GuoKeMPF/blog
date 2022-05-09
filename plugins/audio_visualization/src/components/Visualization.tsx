import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  const [source, setSource] = useState<AudioBufferSourceNode | null>(null);

  const audioCtx = useMemo((): AudioContext => (new window.AudioContext()), [])
  const [rAnimation, setRAnimation] = useState<number>(0);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [audioInfo, setAudioInfo] = useState<{ list: Uint8Array, duration: number, currentTime: number } | null>(null);
  const [firstPlay, setFirstPlay] = useState(true);
  const [buffer, setBuffer] = useState<AudioBuffer | null>(null)

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(rAnimation);
    }
  }, [])



  useEffect(() => {

    audioCtx.suspend().then(function () {
      console.log('Resume context');
    });
    window.cancelAnimationFrame(rAnimation)
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
        audioCtx.resume().then(function () {
          console.log('Suspend context');
        });
        console.log(analyser);

        if (analyser) {
          visualizer(analyser)
        }
      } else {
        audioCtx.suspend().then(function () {
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
      const res: AudioBuffer = await audioCtx.decodeAudioData(arraybuffer);
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
    const analys = audioCtx.createAnalyser();
    const distortion = audioCtx.createWaveShaper();
    const gainNode = audioCtx.createGain();
    const biquadFilter = audioCtx.createBiquadFilter();
    const audioSpurce = audioCtx.createBufferSource();
    audioSpurce.buffer = buffer;
    audioSpurce.connect(audioCtx.destination);
    audioSpurce.loop = true;
    analys.fftSize = 256;
    analys.connect(audioCtx.destination);

    audioSpurce.connect(analys);
    analys.connect(distortion);
    distortion.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    gainNode.connect(audioCtx.destination)


    setSource(audioSpurce);
    setAnalyser(analys);
    if (!firstPlay) {
      audioCtx.resume().then(function () {
        console.log('Suspend context');
      });
      audioSpurce.start(0);
      visualizer(analys)
    }
  }



  // 音频序列化
  const visualizer = (analyser: AnalyserNode) => {
    const requestAnimationFrame = window.requestAnimationFrame
    const v = () => {
      const arrayLength = analyser.frequencyBinCount;
      const array = new Uint8Array(arrayLength);
      analyser.getByteFrequencyData(array);
      console.log(array);
      const duration = buffer?.duration || 0;
      const audio_info = {
        list: array,
        duration,
        currentTime: analyser.context.currentTime || 0
      };
      setAudioInfo(audio_info)
      const r = requestAnimationFrame(v);
      setRAnimation(r);
    };

    const r = requestAnimationFrame(v);
    setRAnimation(r);
  };


  const changeAudioStatus = () => {
    setIsPlay(!isPlay)
  };



  return <div>
    <div className={styles.container}>

      <button onClick={changeAudioStatus}>
        {isPlay ? '暂停' : '播放'}
      </button>
    </div>
  </div>
}

export default Visualization
