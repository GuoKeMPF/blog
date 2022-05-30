type RequestAnimationProps = {
  callback: Function;
};

export default class RequestAnimation {
  callback: Function;
  requestID: number | undefined;
  constructor(props: RequestAnimationProps) {
    this.callback = props.callback;
  }
  start = () => {
    this.callback();
    this.requestID = requestAnimationFrame(this.start);
  };
  stop = () => {
    if (this.requestID) {
      cancelAnimationFrame(this.requestID);
    }
  };
}
