import React, { FunctionComponent, ReactNode } from "react";

import styles from "./Border.module.scss";

interface BorderProps {
  children?: ReactNode;
}

export const Border: FunctionComponent<BorderProps> = ({ children }) => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
