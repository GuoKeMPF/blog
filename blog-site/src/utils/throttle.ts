type ThrottleFunction = (...args: any[]) => void;
/**
 * throttle 节流函数
 * @param {Function} func 节流函数
 * @param {Number} wait 采样时间
 */
const throttle = (func: ThrottleFunction, wait: number): ThrottleFunction => {
  let isThrottled = false;
  let args: any[] | null = null;

  const throttledFunction: ThrottleFunction = function (
    this: Function,
    ...restArgs: any[]
  ) {
    if (!isThrottled) {
      func.apply(this, restArgs);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
        if (args) {
          throttledFunction.apply(this, args);
          args = null;
        }
      }, wait);
    } else {
      args = restArgs;
    }
  };

  return throttledFunction;
};
