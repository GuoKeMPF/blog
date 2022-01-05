export const setTimeOut = (data: any, timeout: number = 1000) => {
  const promise = new Promise((res) => {
    let timer: any = setTimeout(() => {
      res(data);
      timer = null;
    }, timeout);
  });
  return promise;
};
