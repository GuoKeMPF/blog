import React, { FunctionComponent, ReactNode } from "react";
import styles from "./index.module.scss";

interface ContextPropsType {
  children: ReactNode;
}

export const Context: FunctionComponent<ContextPropsType> = ({ children }) => {
  return <div className={styles.context}>{children}</div>;
};
