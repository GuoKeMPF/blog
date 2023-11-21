import React from "react";
import type { FC } from "react";
import styles from "./index.module.scss";

const Loading: FC = () => {
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
export default Loading;
