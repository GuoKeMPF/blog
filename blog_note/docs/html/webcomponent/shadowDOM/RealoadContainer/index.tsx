import { Button, Space, Spin } from 'antd';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type RealoadContainerProps = {
  children: React.ReactNode;
  buttons?: React.ReactNode;
};

function Reaload({ children, buttons = [] }: RealoadContainerProps, ref) {
  const [loaded, setLoaded] = useState(true);
  const handleReload = () => {
    setLoaded(false);
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  };

  const innerRef = useRef<HTMLDivElement>(null);

  // 将内部的 ref 暴露给父组件
  useImperativeHandle(ref, () => {
    console.log(innerRef.current);
    return innerRef.current;
  });

  return (
    <Spin tip="正在挂载" size="small" spinning={!loaded}>
      <div ref={innerRef}>{loaded && children}</div>
      <Space>
        {buttons}
        <Button onClick={handleReload} loading={!loaded}>
          重新挂载
        </Button>
      </Space>
    </Spin>
  );
}

export default forwardRef(Reaload);
