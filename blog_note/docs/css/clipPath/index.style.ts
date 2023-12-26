import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    hexagon: {
      width: 60,
      height: 60,
      clipPath: "polygon(50% 100%,93.3% 75%,93.3% 25%,50% 0%,6.7% 25%,6.7% 75%)",
      backgroundColor: token.colorPrimary,
      color: '#fff',
      fontSize: 20,
      textAlign: 'center',
      wordBreak: 'break-all',
      wordWrap: 'break-word',
    },
    trapezoid: {
      width: 80,
      height: 50,
      clipPath: "polygon(20px 0, calc(100% - 20px) 0, 100% 100%, 0 100%)",
      backgroundColor: token.green,
      color: '#fff',
      padding: "0 20",
      fontSize: 20,
      textAlign: 'center',
      wordBreak: 'break-all',
      wordWrap: 'break-word',
    }

  };
});
export default useStyles;
