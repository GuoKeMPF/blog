type RequestAnimationProps = {
  callback: Function;
};

class RequestAnimation {
  callback: Function;
  requestID: number | undefined;
  requestAnimationFrame =
    window?.requestAnimationFrame ||
    window?.mozRequestAnimationFrame ||
    window?.webkitRequestAnimationFrame ||
    window?.msRequestAnimationFrame;
  cancelAnimationFrame =
    window.cancelAnimationFrame || window?.mozCancelAnimationFrame;

  constructor(props: RequestAnimationProps) {
    this.callback = props.callback;
  }
  start = () => {
    const animation = () => {
      this.callback();
      this.requestID = this.requestAnimationFrame(animation);
    };
    this.requestID = this.requestAnimationFrame(animation);
  };
  stop = () => {
    if (this.requestID) {
      this.cancelAnimationFrame(this.requestID);
    }
  };
}
