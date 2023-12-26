/** @format */

import React from "react";
import useStyles from "./index.style";
import { Divider } from "antd";

const Shape = () => {
  const { styles } = useStyles();
  return (
    <>
      <div className={styles.hexagon}>
      </div>
      <Divider />
      <div className={styles.trapezoid}>
      </div>
    </>
  );
};

export default Shape;
