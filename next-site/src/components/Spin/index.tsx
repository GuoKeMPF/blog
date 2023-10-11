import { FC, ReactNode } from "react";
import Loading from "@/components/Loading";
import styles from "./index.module.scss";

interface SpinPropsType {
  loading: boolean;
  children: ReactNode | ReactNode[];
}

const Spin: FC<SpinPropsType> = (props) => {
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
export default Spin;
