import React, { Fragment, useContext, useMemo } from 'react';
import { Alert } from 'antd';
import { MemoContext } from '.';

const Memo = () => {
  const { red, blue, yellow }: any = useContext(MemoContext);

  const formatTime = (value: string | number | Date) => {
    console.log('Memo');
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

  const updateRed = useMemo(() => formatTime(red), [red]);
  const updateBlue = useMemo(() => formatTime(blue), [blue]);
  const updateYellow = useMemo(() => formatTime(yellow), []);

  return (
    <Fragment>
      <Alert
        message="useMemo"
        description={
          <p>
            依赖项数yellow更新将不触发函数更新，blue，red在依赖项内，更新red，blue时会触发更新。
          </p>
        }
        type="info"
      />
      <p>red update at: {updateRed}</p>
      <p>blue update at: {updateBlue}</p>
      <p>yellow update at: {updateYellow}</p>
    </Fragment>
  );
};
export default Memo;
