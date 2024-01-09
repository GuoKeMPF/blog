import { Button, Divider } from 'antd';
import React, { Fragment, useEffect, useRef } from 'react';
import RealoadContainer from '../RealoadContainer';
import ShadowSpan from './ShadowSpan';

export const CreateShadow = () => {
  const shadowRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const updateDom = () => {
    if (!container.current) {
      throw new Error('未找到容器元素');
    }
    console.log(shadowRef)
    const textDom = container.current.querySelectorAll('.text');
    const spans = Array.from(textDom);
    for (const span of spans) {
      span.textContent = span?.textContent?.toUpperCase() ?? null;
    }
  };

  useEffect(() => {
    if (!customElements.get('shadow-span')) {
      customElements.define('shadow-span', ShadowSpan, { extends: 'span' });
    }
  }, []);

  return (
    <RealoadContainer
      ref={container}
      buttons={
        <Fragment>
          <Button onClick={updateDom}>更新节点内容</Button>
        </Fragment>
      }
    >
      <shadow-span ref={shadowRef}>影子元素内abc</shadow-span>
      <Divider />
      <span className="text">影子元素外abc</span>
      <Divider />
    </RealoadContainer>
  );
};

export default CreateShadow;
