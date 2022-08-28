import { Avatar, Button, Dropdown, Menu, Space } from 'antd';
import type { FC } from 'react';
import type { Dispatch, UserModelState } from 'umi';
import { connect } from 'umi';
interface PageProps {
  username: string;
  dispatch: Dispatch;
}
const Header: FC<PageProps> = ({ username, dispatch }) => {
  const logout = () => {
    dispatch({
      type: 'user/logout',
    });
  };
  const menu = (
    <Menu
      items={[
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
  return (
    <Space>
      <Dropdown overlay={menu}>
        <Avatar
          style={{ color: '#1890ff', backgroundColor: '#fff', verticalAlign: 'middle' }}
          size="large"
          // gap={4}
        >
          {username}
        </Avatar>
      </Dropdown>
    </Space>
  );
};

export default connect(({ user }: { user: UserModelState }) => ({
  username: user.username,
}))(Header);
