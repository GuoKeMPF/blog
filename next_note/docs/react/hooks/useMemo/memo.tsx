import { Alert } from 'antd';
import React, { Fragment, useMemo } from 'react';

interface MemoPropsType {
  red: string | number | Date;
  blue: string | number | Date;
  yellow: string | number | Date;
}

const Memo = ({ red, blue, yellow }: MemoPropsType) => {
  const formatTime = (value: string | number | Date) => {
    // 每次更新只会执行一次
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
  const updateYellow = useMemo(() => formatTime(yellow), [yellow]);

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
