import React, { FC, ReactNode, ReactElement } from "react";
import styles from "./index.module.scss";

interface BodyPropsType {
  children?: ReactNode | ReactElement;
}

export const Body: FC<BodyPropsType> = ({ children }) => {
  return <div className={styles.body}>{children}</div>;
};
