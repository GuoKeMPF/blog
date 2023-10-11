import { useEffect, useState, useMemo, useRef, Fragment } from "react";
import type { FC, ChangeEvent } from "react";
import styles from "./index.module.scss";

interface Props {
  page: string;
  total: number;
  size?: number;
  onChange: (page: string) => void;
  disable?: boolean;
  position?: "left" | "center" | "right";
}
const Pagination: FC<Props> = ({
  page = "1",
  total = 0,
  size = 10,
  onChange,
  disable,
  position = "left",
}) => {
  const max = useMemo(() => Math.ceil(total / size), [total, size]);
  const [focus, setFocus] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);

  const pre = () => {
    const num = Number(page);
    if (isNaN(num)) {
      return;
    }
    change(num - 1);
  };
  const next = () => {
    const num = Number(page);
    if (isNaN(num)) {
      return;
    }
    change(num + 1);
  };

  useEffect(() => {
    if (focus && input) {
      input.current?.focus();
    }
  }, [focus]);

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setFocus(false);
    const value = e?.target?.value || "1";
    change(value);
  };

  const change = (value: string | number) => {
    if (value + "" === page + "") {
      return;
    }
    let num = Number(value);
    if (isNaN(num)) {
      return;
    }
    if (num < 1) {
      num = 1;
    }
    if (num > max) {
      num = max;
    }
    onChange(num.toString());
  };

  return max > 0 ? (
    <ul className={`${styles.pagination} ${styles[position]}`}>
      <li className={styles.item}>
        {page !== "1" && (
          <button disabled={disable} className={styles.pre} onClick={pre}>
            <span className={styles.arrow}></span>
          </button>
        )}
      </li>
      <li>
        {focus ? (
          <input
            type="text"
            ref={input}
            className={styles.current}
            onBlur={onBlur}
          />
        ) : (
          <button className={styles.focus} onClick={onFocus}>
            {page?.toString()}
          </button>
        )}
      </li>
      <li>
        <span className={styles.delimiter}>/</span>
      </li>
      <li>
        <span className={styles.total}>{max}</span>
      </li>
      <li className={styles.item}>
        {page !== max.toString() && (
          <button disabled={disable} className={styles.next} onClick={next}>
            <span className={styles.arrow}></span>
          </button>
        )}
      </li>
    </ul>
  ) : (
    <Fragment />
  );
};

export default Pagination;
