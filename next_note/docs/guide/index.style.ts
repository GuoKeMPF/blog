import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    p: {
      color: "red",
      ".title": {
        color: "blue",
      },
      title: {
        color: "green",
      }
    }
  }
});
export default useStyles;
