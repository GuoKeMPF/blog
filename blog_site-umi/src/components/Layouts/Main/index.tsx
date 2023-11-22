import React, { FunctionComponent, ReactNode } from 'react';

export const Main: FunctionComponent<ReactNode> = ({ children }) => {
  return <main>{children}</main>;
};
