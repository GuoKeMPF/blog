import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    container: {
      width: '100px',
      minHeight: '100px'
    },
    linear: {
      // 渐变方向，渐变色各个位置的颜色
      backgroundImage: `linear-gradient(45deg, red 0 30%, blue 70% 100%)`
    },
    radial: {
      // 渐变形状 圆形 或者 椭圆形
      // 渐变尺寸
      // 渐变中心点位置
      // 渐变颜色值
      backgroundImage: `radial-gradient(
          ellipse 80px 40px at 40px 40px,
          #f35 0%,
          #43e 100%)
      `
    },
    conic: {
      // 起始角度
      // 渐变中心
      // 色标
      // 插值
      backgroundImage: `conic-gradient(
        hsl(360, 100%, 50%),
        hsl(315, 100%, 50%),
        hsl(270, 100%, 50%),
        hsl(225, 100%, 50%),
        hsl(180, 100%, 50%),
        hsl(135, 100%, 50%),
        hsl(90, 100%, 50%),
        hsl(45, 100%, 50%),
        hsl(0, 100%, 50%)
      )`
    },
    repeatingLinear: {
      backgroundImage: `repeating-linear-gradient(45deg, #3f87a6, #ebf8e1 15%, #f69d3c 20%);`
    },
    repeatingRadial: {
      backgroundImage: `repeating-radial-gradient(#e66465, #9198e5 20%);`
    },
    multiple: {
      backgroundImage: `repeating-radial-gradient(#e6646533, #9198e57a 20%),
      linear-gradient(135deg, #00000078 0 30%, #ffffffa3 70% 100%),
      conic-gradient(
        hsl(360, 100%, 50%),
        hsl(315, 100%, 50%),
        hsl(270, 100%, 50%),
        hsl(225, 100%, 50%),
        hsl(180, 100%, 50%),
        hsl(135, 100%, 50%),
        hsl(90, 100%, 50%),
        hsl(45, 100%, 50%),
        hsl(0, 100%, 50%)
        )`
    }
  };
});
export default useStyles;
