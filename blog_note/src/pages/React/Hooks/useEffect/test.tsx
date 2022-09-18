import React, { Component, Fragment } from 'react';
import { Button } from 'antd';

interface StateType {
  count: number;
}
interface PropsType {}

class LifeCycle extends Component<any, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    console.log('mount');
  }

  componentDidUpdate(preProps: PropsType, PreState: StateType) {
    console.log('update');
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  addCount = () => {
    const { count } = this.state;
    this.setState({
      count: count + 1,
    });
  };

  render() {
    const { addCount, state } = this;
    const { count } = state;
    return (
      <Fragment>
        <p>count: {count}</p>
        <Button onClick={addCount}>count + 1</Button>
      </Fragment>
    );
  }
}

export default LifeCycle;
