import { Button, Space } from 'antd';
import styles from './FormFooter.less';

const FormFooter = ({
  onSubmit,
  onConcel,
  name,
  submitLoading,
}: {
  name: string;
  submitLoading?: boolean;
  onSubmit?: (value: any) => void;
  onConcel?: () => void;
}) => {
  return (
    <div id={`${name}_formContainer`} className={`${styles.formContainer} formContainer`}>
      <Space align="center">
        {onConcel && (
          <Button id={`${name}_concel`} onClick={onConcel}>
            取消
          </Button>
        )}
        {onSubmit && (
          <Button type="primary" id={`${name}_submit`} loading={submitLoading} htmlType="submit">
            确定
          </Button>
        )}
      </Space>
    </div>
  );
};

export default FormFooter;
