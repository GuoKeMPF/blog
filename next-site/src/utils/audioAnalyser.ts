type AudioAnalyserStatusProps = {
  src: string | URL;
  onLoad?: Function;
};

type AudioAnalyserStatusType = {
  init: 'init';
  started: 'started';
  stoped: 'stoped';
};

export const AudioAnalyserStatus: AudioAnalyserStatusType = {
  init: 'init',
  started: 'started',
  stoped: 'stoped',
};

export default class AudioAnalyser {
  src: string | URL;
  status: 'init' | 'started' | 'stoped' = 'init';
  audioCtx: AudioContext = new AudioContext();
  buffer: AudioBuffer | null = null;
  source: AudioBufferSourceNode | null = null;
  fftSize = 1024;
  analyser: AnalyserNode | null = null;
  onloadCallBack?: Function;
  constructor(props: AudioAnalyserStatusProps) {
    this.src = props.src;
    this.onloadCallBack = props?.onLoad;
    this.loadAudio();
  }

  private onload = () => {
    if (this?.onloadCallBack) {
      this?.onloadCallBack(this);
    }
  };

  start = async () => {
    if (this.status === AudioAnalyserStatus.started) {
      console.log('started');
      return;
    }
    if (!this.source) {
      console.log('no source');
      return;
    }
    if (this.status === AudioAnalyserStatus.init) {
      this.source.start(0);
    }
    this.status = AudioAnalyserStatus.started;
    const res = await this.audioCtx?.resume();
  };

  suspend = async () => {
    this.status = AudioAnalyserStatus.stoped;
    const res = await this.audioCtx?.suspend();
  };
  decode = async (arraybuffer: ArrayBuffer) => {
    try {
      const res: AudioBuffer | undefined = await this.audioCtx.decodeAudioData(
        arraybuffer,
      );
      return res;
    } catch (error) {
    }
  };

  loadAudio = async () => {
    const xhr = new XMLHttpRequest();
    xhr.abort();
    xhr.open('GET', this.src);
    xhr.responseType = 'arraybuffer';
    xhr.onload = async () => {
      const audioData = xhr.response;
      const b = await this.decode(audioData);
      if (b) {
        this.buffer = b;
        this.status = AudioAnalyserStatus.init;
        this.connectAudio();
        this.onload();
      }
    };
    xhr.send();
    // try {
    //   let headers = new Headers()
    //   headers.append('Content-Type', 'audio/mpeg');
    //   headers.append('Access-Control-Allow-Credentials', 'true');
    //   fetch(this.src, {
    //     mode: 'no-cors',
    //     referrerPolicy: 'no-referrer',
    //     headers: headers }).then(
    //     async (audioData) => {
    //       console.log(audioData);
    //       const blob = await audioData.arrayBuffer();
    //       console.log(blob);
    //       const b = await this.decode(blob);
    //       if (b) {
    //         this.buffer = b;
    //         this.status = AudioAnalyserStatus.init;
    //         this.connectAudio();
    //         this.onload();
    //       }
    //     },
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
  };

  connectAudio = async () => {
    const analys = this.audioCtx.createAnalyser();
    const distortion = this.audioCtx.createWaveShaper();
    const gainNode = this.audioCtx.createGain();
    const biquadFilter = this.audioCtx.createBiquadFilter();
    const audioSpurce = this.audioCtx.createBufferSource();
    audioSpurce.buffer = this.buffer;
    audioSpurce.connect(this.audioCtx.destination);
    audioSpurce.loop = true;
    analys.fftSize = this.fftSize;
    analys.connect(this.audioCtx.destination);

    audioSpurce.connect(analys);
    analys.connect(distortion);
    distortion.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    this.analyser = analys;
    this.source = audioSpurce;
  };

  getFrequencyData = () => {
    if (this.analyser) {
      const arrayLength = this.analyser.frequencyBinCount;
      const array = new Uint8Array(arrayLength);
      this.analyser.getByteFrequencyData(array);
      return array;
    }
  };

  getAudioInfo = () => {
    let audio_info;
    if (this.buffer && this.analyser) {
      const currentTime = this.analyser.context.currentTime || 0;
      const duration = this.buffer?.duration || 0;
      audio_info = {
        duration,
        currentTime,
      };
    }
    return audio_info;
  };
}
