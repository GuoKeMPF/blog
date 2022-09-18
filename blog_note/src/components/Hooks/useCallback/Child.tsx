import React, { memo, Fragment, useMemo } from 'react';
import { Button, message } from 'antd';

interface PropsType {
  name: string;
  onClick: (str: string) => void;
}
const Child = memo(({ name, onClick }: PropsType) => {
  const formatTime = (value: string | number | Date) => {
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
  const timer = useMemo(() => formatTime(new Date()), [onClick]);
  message.info(`render child at ${timer}`);
  return (
    <Fragment>
      <div>name {name}</div>
      <Button onClick={() => onClick(`hello ${new Date().getTime()}`)}>
        改变 name 值
      </Button>
    </Fragment>
  );
});

export default Child;
