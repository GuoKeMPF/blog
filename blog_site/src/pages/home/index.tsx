import React from 'react';
import type { FC } from 'react';
import Background from '@/components/Background';

import styles from './index.less';

const Home: FC = () => {
  return (
    <div id="home" className={styles.body}>
      <div className={styles.context}></div>
      <Background />
    </div>
  );
};


export default Home
