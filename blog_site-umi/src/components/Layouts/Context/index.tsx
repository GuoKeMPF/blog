import React, { FunctionComponent, ReactNode } from 'react';
import styles from './index.less';

export const Context: FunctionComponent<ReactNode> = ({ children }) => {
  return <div className={styles.context}>{children}</div>;
};
