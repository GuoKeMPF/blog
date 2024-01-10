import { Divider } from 'antd';
import React, { useEffect } from 'react';
import { ShadowCssProgrammatically } from './Element';
import useStyles from './index.style';

export const ShadowCss = () => {
  const { styles } = useStyles();

  useEffect(() => {
    if (!customElements.get('shadow-css-programmatically')) {
      customElements.define(
        'shadow-css-programmatically',
        ShadowCssProgrammatically,
      );
    }
  }, []);

  return (
    <>
      <Divider orientation="left">原生标签</Divider>
      <span className={styles.colorText}>原生标签</span>
      <Divider orientation="left">影子元素编程式样式</Divider>
      <shadow-css-programmatically class={styles.colorText}>
        影子元素shadow css programmatically
      </shadow-css-programmatically>
      <Divider />
    </>
  );
};

export default ShadowCss;
