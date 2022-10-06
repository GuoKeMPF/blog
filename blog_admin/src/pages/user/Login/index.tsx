import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import Footer from '@/components/Footer';
import styles from './index.less';
import { connect } from 'umi';
import type { ConnectRC, Loading, Dispatch } from 'umi';
import { encrypt } from '@/utils/jsencrypt';
import logo from '@/assets/images/logo.png';

interface PageProps {
  loading: boolean;
  dispatch: Dispatch;
}
const Login: ConnectRC<PageProps> = ({ dispatch }) => {
  const handleSubmit = async (values: { username: string; password: string }) => {
    const { username, password } = values;
    const encodeNmae = encrypt(username);
    const encodePwd = encrypt(password);
    await dispatch({
      type: 'user/login',
      payload: {
        ...values,
        username: encodeNmae,
        password: encodePwd,
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={logo} />}
          title="数据管理中心"
          subTitle={'孤舟江海寄余生的后台网站'}
          onFinish={async (values) => {
            await handleSubmit(values as { username: string; password: string });
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={'用户名'}
            rules={[
              {
                required: true,
                message: '用户名是必填项！',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={'密码'}
            rules={[
              {
                required: true,
                message: '密码是必填项！',
              },
            ]}
          />
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default connect(({ loading }: { loading: Loading }) => ({
  loading: loading['user/login'],
}))(Login);
