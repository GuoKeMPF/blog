import React from 'react';
import { Divider } from 'antd';
import styles from './index.less';

const useCallbackConponent = () => {
  return (
    <div>
      <Divider orientation="left">彩色字体颜色</Divider>
      <p className={styles.colortext}>小巷阴雨夜微凉，孤舟江海寄余生。</p>
    </div>
  );
};

export default useCallbackConponent;
