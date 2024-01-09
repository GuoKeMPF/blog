import { Button, Divider } from 'antd';
import React, { Fragment, useEffect, useRef, useState, type FC } from 'react';
import { WordCount } from './Elements';

export const CustomizedBuiltInElement: FC = () => {
  const [str, setStr] = useState('hello world');

  const buildin = useRef(null);
  const custom = useRef(null);

  const onClick = () => {
    const newStr = `${str} hello world`;
    buildin.current.innerText = newStr;
    setStr(newStr);
  };

  useEffect(() => {
    if (!customElements.get('word-count')) {
      customElements.define('word-count', WordCount, { extends: 'p' });
    }
  }, []);

  return (
    <Fragment>
      <Divider orientation="left">原生 p 标签</Divider>
      <p id="buildin" ref={buildin}>
        hello world
      </p>

      <Divider orientation="left">自定义内置 p 标签</Divider>
      <p is="word-count" max={20} id="custom" ref={custom} text={str}></p>
      <Button onClick={onClick}>Update</Button>
    </Fragment>
  );
};

export default CustomizedBuiltInElement;
