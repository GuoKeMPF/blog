import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    colorText: {
      backgroundClip: 'text',
      color: 'transparent',
      backgroundImage: `repeating-radial-gradient(circle at 20% 40%,
			#eea2a2 20px,
			#57c6e1 20px,
			#b49fda 40px,
			#7ac5d8 40px,
			#b49fda 60px,
			#4f9c9c 60px,
			#57c6e1 80px,
			#99cccc 80px,
			#eea2a2 100px)`,
    },
  };
});
export default useStyles;
