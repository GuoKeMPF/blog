import React, { FunctionComponent, ReactNode } from 'react';

import styles from './Border.less';

export const Border: FunctionComponent<ReactNode> = ({ children }) => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
