import { ReactChild } from 'react';
import Loading from '@/components/Loading';
import styles from './index.less';

export default (props: {
  loading: boolean;
  children: ReactChild | ReactChild[];
}) => {
  const { loading, children } = props;
  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {children}
    </div>
  );
};
