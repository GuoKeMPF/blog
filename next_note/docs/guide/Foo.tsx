import React, { type FC } from 'react';

import useStyles from "./index.style";



const Foo: FC<{ title: string }> = (props) => {
  const { styles } = useStyles();
  return <h4 className={styles.p}>
    <p>{props.title}</p>
    <p className="title">
      {props.title}
    </p>
    <p className={styles.title}>
      {props.title}
    </p>

  </h4>
};

export default Foo;
