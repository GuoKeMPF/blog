import React, { useState, Fragment } from 'react';
import { Switch, Button, Space } from 'antd';
import { Effect } from './effect';

const useEffectConponent = () => {
  const [mount, setMount] = useState(false);
  const [value, setvalue] = useState(0);

  const onChange = (v: boolean) => {
    setMount(v);
  };
  return (
    <Fragment>
      <Space>
        <Button onClick={() => setvalue(value + 1)}>add value</Button>
        <Switch
          checkedChildren={<div>挂载</div>}
          unCheckedChildren={<div>卸载</div>}
          onChange={onChange}
        />
      </Space>
      <p>value:{value}</p>
      {mount ? <p>true</p> : <p>false</p>}
      {mount && <Effect value={value} />}
    </Fragment>
  );
};

export default useEffectConponent;
