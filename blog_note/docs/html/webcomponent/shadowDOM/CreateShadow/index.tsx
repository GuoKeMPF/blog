import { Button, Divider } from 'antd';
import React, { Fragment, useEffect, useRef } from 'react';
import RealoadContainer from '../RealoadContainer';
import { ShadowSpanClosed, ShadowSpanOpen } from './Element';

export const CreateShadow = () => {
  useEffect(() => {
    if (!customElements.get('shadow-span-open')) {
      customElements.define('shadow-span-open', ShadowSpanOpen);
    }
    if (!customElements.get('shadow-span-closed')) {
      customElements.define('shadow-span-closed', ShadowSpanClosed);
    }
  }, []);
  const container = useRef<HTMLDivElement>(null);

  const updateDom = () => {
    if (!container.current) {
      throw new Error('未找到容器元素');
    }
    const textDom = container.current.querySelectorAll('.text');
    const spans = Array.from(textDom);
    for (const span of spans) {
      span.textContent = span?.textContent?.toUpperCase() ?? null;
    }
  };

  const updateShadowDom = () => {
    if (!container.current) {
      throw new Error('未找到容器元素');
    }
    const shadowDOMs = container.current.querySelectorAll('.shadowDOM');
    const doms = Array.from(shadowDOMs);

    console.log(doms);

    for (const shadow of doms) {
      const spans = Array.from(
        shadow?.shadowRoot?.querySelectorAll('span') || [],
      );
      for (const span of spans) {
        span.textContent = span.textContent.toUpperCase();
      }
    }
  };

  return (
    <>
      <RealoadContainer
        ref={container}
        buttons={
          <Fragment>
            <Button onClick={updateDom}>将span内容替换成大写</Button>
            <Button onClick={updateShadowDom}>
              将shadowDOM 内 span内容替换成大写
            </Button>
          </Fragment>
        }
      >
        <shadow-span-open class="shadowDOM">影子元素open abc</shadow-span-open>
        <Divider />

        <shadow-span-closed class="shadowDOM">
          影子元素closed abc
        </shadow-span-closed>
        <Divider />
        <span className="text">影子元素外span abc</span>
        <Divider />
      </RealoadContainer>
    </>
  );
};

export default CreateShadow;
