import { Button, Space, Switch } from 'antd';
import React, { Fragment, useState } from 'react';
import { Effect } from './effect';

const EffectComponent = () => {
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

export default EffectComponent;
