import styles from './Language.less';

import type { FC } from 'react';

import IconFont from '@/components/IconFont';

import { setLocale } from 'umi';

type Languages = 'zh-CN' | 'en-US';

const Language: FC = () => {
  const switchLangues = (type:Languages) => {
    setLocale(type, false)
  };

  return (
    <ul className={styles.languages}>
      <li className={styles.Language}>
        <IconFont type="Languages" />
      </li>
      <li className={styles.chinese}>
        <button
          className={styles.button}
          onClick={() => switchLangues('zh-CN')}
        >
          中
        </button>
      </li>
      <li className={styles.english}>
        <button
          className={styles.button}
          onClick={() => switchLangues('en-US')}
        >
          En
        </button>
      </li>
    </ul>
  );
};

export default Language;
