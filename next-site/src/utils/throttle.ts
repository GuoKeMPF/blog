/**
 * throttle 节流函数
 * @param {Function} func 节流函数
 * @param {Number} wait 采样时间
 */

export const throttle = (func: Function, wait = 200) => {
  let timeout: null | Object;
  return function () {
    let args = arguments;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
    if (timeout) {
      func.apply(this, args);
    }
  };
};
