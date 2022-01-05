import React, { Fragment, ReactChild } from 'react';
import Loading from '@/components/Loading';

export default (props: { loading: boolean; children: ReactChild | ReactChild[] }) => {
  const { loading, children } = props;
  return <Fragment>{loading ? <Loading /> : children}</Fragment>;
};
