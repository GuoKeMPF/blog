type RequestAnimationProps = {
  callback: Function;
};

type RequestAnimationStatustype = {
  init: 'init',
  running: 'running',
  suspend: 'suspend',
}

export const RequestAnimationStatus: RequestAnimationStatustype = {
  init: 'init',
  running: 'running',
  suspend: 'suspend',
}


export default class RequestAnimation {
  callback: Function;
  requestID: number | undefined;
  status: 'init' | 'running' | 'suspend' = "init";
  constructor(props: RequestAnimationProps) {
    this.callback = props.callback;
  }
  start = () => {
    const animation = () => {
      this.callback();
      this.requestID = requestAnimationFrame(animation);
    };
    if (this.status !== RequestAnimationStatus.running) {
      this.status = RequestAnimationStatus.running;
      animation();
    }
  };
  stop = () => {
    if (this.requestID) {
      cancelAnimationFrame(this.requestID);
    }
  };
}
