import React from 'react';
import Background from '@/components/Background';

import styles from './index.less';

export default () => {
  return (
    <div id="home" className={styles.body}>
      <div className={styles.context}></div>
      <Background />
    </div>
  );
};
