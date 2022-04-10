import React, { FC } from 'react';
import styles from './TextItem.less';

import { Link, TextsType } from 'umi';

interface PageProps {
  text: TextsType;
}

const TextItem: FC<PageProps> = ({ text }) => {
  const {
    id,
    title = '',
    description = '',
    content = '',
  } = text;
  return (
    <Link to={`/text/${id}`} className={styles.text}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </Link>
  );
};

export default TextItem;
