/** @format */

import React from "react";
import useStyles from "./index.style";

const ColorText = () => {
  const { styles } = useStyles();
  return (
    <div>
      <p className={styles.colorText}>小巷阴雨夜微凉，孤舟江海寄余生。</p>
    </div>
  );
};

export default ColorText;
