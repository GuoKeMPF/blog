import React, { FunctionComponent, ReactNode } from 'react';
import styles from './index.less';

export const Body: FunctionComponent<ReactNode> = ({ children }) => {
  return <div className={styles.body}>{children}</div>;
};
