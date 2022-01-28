import React from 'react';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.container}>
      <div className={styles.nucleus}></div>
      <div className={styles.track}>
        <div className={styles.electronic}></div>
      </div>
      <div className={styles.track}>
        <div className={styles.electronic}></div>
      </div>
      <div className={styles.track}>
        <div className={styles.electronic}></div>
      </div>
      <div className={styles.track}>
        <div className={styles.electronic}></div>
      </div>
    </div>
  );
};
