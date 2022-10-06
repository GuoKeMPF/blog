import { useMemo } from 'react';

import { Avatar, Button, Dropdown, Menu, Space } from 'antd';
import type { FC } from 'react';
import type { Dispatch, UserModelState } from 'umi';
import { connect } from 'umi';
import { UserOutlined } from '@ant-design/icons';
interface PageProps {
  username: string;
  dispatch: Dispatch;
}
const Header: FC<PageProps> = ({ username, dispatch }) => {
  const menu = useMemo(() => {
    const logout = () => {
      dispatch({
        type: 'user/logout',
      });
    };
    return (
      <Menu
        items={[
          {
            key: 'username',
            label: (
              <Space>
                <Avatar icon={<UserOutlined />} style={{ verticalAlign: 'middle' }} size="small" />
                {username}
              </Space>
            ),
          },
          {
            key: 'logout',
            label: (
              <Button type="text" onClick={logout}>
                登出
              </Button>
            ),
          },
        ]}
      />
    );
  }, [username, dispatch]);

  return (
    <Space>
      <Dropdown overlay={menu}>
        <Avatar
          style={{ verticalAlign: 'middle' }}
          size="large"
          // gap={4}
        >
          {username.slice(0, 1).toLocaleUpperCase()}
        </Avatar>
      </Dropdown>
    </Space>
  );
};

export default connect(({ user }: { user: UserModelState }) => ({
  username: user.username,
}))(Header);
