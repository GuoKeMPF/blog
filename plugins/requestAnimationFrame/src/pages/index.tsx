import styles from './index.less';
import { Link } from 'umi';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to={'/about'}>about</Link>
    </div>
  );
}
