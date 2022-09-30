import React, {
  useRef,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Button, Divider } from 'antd';

const useFefConponent = (_props: any, ref: React.Ref<unknown> | undefined) => {
  const input = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => input.current);
  const updateInput = () => {
    console.group('input');
    console.log('group');
    console.groupEnd();
    console.dir(input.current);
    if (input && input.current) {
      input.current.value = `inner set ${new Date().getTime()}`;
    }
  };

  return (
    <Fragment>
      <Divider orientation="left">子组件</Divider>
      <Button onClick={updateInput}>子组件更新</Button>
      <Divider />
      <input type="text" ref={input} />
    </Fragment>
  );
};
export default forwardRef(useFefConponent);
