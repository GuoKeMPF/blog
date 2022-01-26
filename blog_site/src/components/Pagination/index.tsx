import React, { FormEvent, useMemo, Fragment } from 'react';
import type { FC } from 'react';
import styles from './index.less';

interface Props {
  page: number;
  total: number;
  size?: number;
  onChange: (page: string) => void;
}
const Pagination: FC<Props> = ({
  page = 1,
  total = 0,
  size = 10,
  onChange,
}) => {
  const max = useMemo(() => Math.ceil(total / size), [total, size]);

  const pre = () => {
    console.log('pre');
  };
  const next = () => {
    console.log('next');
  };

  const changePage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const value = e?.target?.value;
    onChange(value);
  };

  return max > 0 ? (
    <ul className={styles.pagination}>
      <li>
        <button className={styles.pre} onClick={pre}>
          <span className={styles.arrow}></span>
        </button>
      </li>
      <li>
        <input
          type="text"
          className={styles.current}
          value={page}
          onChange={changePage}
        />
      </li>
      <li>
        <span className={styles.delimiter}>/</span>
      </li>
      <li>
        <span className={styles.total}>{max}</span>
      </li>
      <li>
        <button className={styles.next} onClick={next}>
          <span className={styles.arrow}></span>
        </button>
      </li>
    </ul>
  ) : (
    <Fragment />
  );
};

export default Pagination;
