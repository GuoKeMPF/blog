import React from 'react';
import { Divider } from 'antd';
import WithCallback from '../../../../components/Hooks/useCallback/WithCallback';
import WithoutCallback from '../../../../components/Hooks/useCallback/WithoutCallback';

const useCallbackConponent = () => {
  return (
    <div>
      <Divider orientation="left">WithCallback</Divider>
      <WithCallback />
      <Divider orientation="left">WithoutCallback</Divider>
      <WithoutCallback />
    </div>
  );
};

export default useCallbackConponent;
