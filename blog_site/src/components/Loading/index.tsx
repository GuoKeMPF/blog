import React from 'react';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.container}>
      <div className={styles.gearbox}>
        <div className={styles.overlay}></div>
        <div className={`${styles.gear} ${styles.one}`}>
          <div className={styles.gear_inner}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </div>
        <div className={`${styles.gear} ${styles.two}`}>
          <div className={styles.gear_inner}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </div>
        <div className={`${styles.gear} ${styles.three}`}>
          <div className={styles.gear_inner}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </div>
        <div className={`${styles.gear} ${styles.four} ${styles.large}`}>
          <div className={styles.gear_inner}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
