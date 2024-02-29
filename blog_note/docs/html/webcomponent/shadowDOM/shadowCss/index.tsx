import { Divider } from 'antd';
import React, { Fragment, useEffect } from 'react';
import { ShadowCssProgrammatically, ShadowCssDeclaratively } from './Element';
import useStyles from './index.style';

export const ShadowCss = () => {
  const { styles } = useStyles();
  const templateId = 'shadow-css-template-declaratively';

  useEffect(() => {
    if (!customElements.get('shadow-css-programmatically')) {
      customElements.define(
        'shadow-css-programmatically',
        ShadowCssProgrammatically,
      );
    }
    if (!customElements.get('shadow-css-declaratively')) {
      customElements.define(
        'shadow-css-declaratively',
        ShadowCssDeclaratively,
      );
    }
  }, []);

  return (
    <>
      <template id={templateId} dangerouslySetInnerHTML={{
        __html: `
        <style>
          .text { color: #33ff33; }
        </style>
      `}} >
      </template >
      <Divider orientation="left">原生标签</Divider>
      <span className={styles.colorText}>原生标签</span>
      <Divider orientation="left">影子元素编程式样式</Divider>
      <shadow-css-programmatically class={styles.colorText}>
        影子元素shadow css programmatically
      </shadow-css-programmatically>

      <Divider orientation="left">影子元素声明式样式</Divider>
      <shadow-css-declaratively templateId={templateId} class={styles.colorText}>
        影子元素shadow css declaratively
      </shadow-css-declaratively>
      <Divider />
    </>
  );
};

export default ShadowCss;
