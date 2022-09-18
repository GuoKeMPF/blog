import React, { Fragment, useReducer } from 'react';
import { Button, Alert, Divider } from 'antd';

const getSection = (value: number) => {
  let result;
  switch (true) {
    case value > 0:
      result = '正';
      break;
    case value < 0:
      result = '负';
      break;
    case value === 0:
      result = '零';
      break;
    default:
      result = '非数字';
      break;
  }
  return result;
};

const init = (initialCount: any) => ({
  count: initialCount,
  section: getSection(initialCount),
});

const reducer = (
  state: { count: number },
  action: { payload: any; type?: any },
) => {
  let count;
  let section;
  const { type, payload } = action;
  const { value } = payload;
  switch (type) {
    case 'add':
      count = value;
      section = getSection(count);
      return { count, section };
    case 'reduce':
      count = value;
      section = getSection(count);
      return { count, section };
    case 'reset':
      count = value;
      section = getSection(count);
      return { count, section };
    default:
      throw new Error('reducer');
  }
};

const useReducerConponent = ({ initialCount = 0 }) => {
  const [state, dispatch] = useReducer(reducer, initialCount, init);

  const addCount = () => {
    dispatch({
      type: 'add',
      payload: {
        value: state.count + 1,
      },
    });
  };
  const reduceCount = () => {
    dispatch({
      type: 'reduce',
      payload: {
        value: state.count - 1,
      },
    });
  };

  const resetCount = () => {
    dispatch({
      type: 'reset',
      payload: {
        value: 0,
      },
    });
  };

  return (
    <Fragment>
      <Alert
        message="useReducer"
        type="info"
        description={
          <Fragment>
            <p>
              useState 的替代方案。它接收一个形如 (state, action) =&gt; newState
              的reducer，并返回当前的 state 以及与其配套的 dispatch 方法。
            </p>
            <p>
              useReducer相对于useState可以完成赋值前校验操作,对于有依赖关系的赋值操作更加方便.
            </p>
          </Fragment>
        }
      />
      <Divider orientation="left">useReducer</Divider>
      <Button.Group>
        <Button onClick={addCount}>加一</Button>
        <Button onClick={reduceCount}>减一</Button>
        <Button onClick={resetCount}>重置</Button>
      </Button.Group>
      <p>
        状态管理里面的count值: <b>{state.count}</b>
      </p>
      <p>
        count正负: <b>{state.section}</b>
      </p>
    </Fragment>
  );
};
export default useReducerConponent;
