import React, { Fragment, useContext } from 'react';
import { Alert } from 'antd';
import { MemoContext } from '.';

const NoneMemo = () => {
  const { red, blue, yellow }: any = useContext(MemoContext);

  const formatTime = (value: string | number | Date) => {
    console.log('NoneMemo');
    const t = new Date(value);
    const y = t.getFullYear();
    const m = t.getMonth() + 1;
    const d = t.getDate();
    const H = t.getHours();
    const M = t.getMinutes();
    const S = t.getSeconds();
    const ms = t.getMilliseconds();
    return `${y}年${m}月${d}日 ${H}时${M}分${S}秒${ms}毫秒`;
  };

  const updateRed = formatTime(red);
  const updateBlue = formatTime(blue);
  const updateYellow = formatTime(yellow);

  return (
    <Fragment>
      <Alert
        message="不使用useMemo"
        description={
          <p>不使用useMemo情况下每次更新都会把三个更新重新计算一下</p>
        }
        type="info"
      />
      <p>red update at: {updateRed}</p>
      <p>blue update at: {updateBlue}</p>
      <p>yellow update at: {updateYellow}</p>
    </Fragment>
  );
};

export default NoneMemo;
