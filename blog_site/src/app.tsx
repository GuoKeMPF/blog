import './app.less';
export const dva = {
  config: {
    onError(e: Error) {
      console.dir(e);
    },
  },
};
