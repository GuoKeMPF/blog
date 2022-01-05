import React from 'react';
import { Space, Avatar, Dropdown, Menu, Button } from 'antd';
import { connect } from 'umi';
import type { UserModelState, Dispatch } from 'umi';
import type { FC } from 'react';
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
    <Menu>
      <Menu.Item key="logout">
        <Button type="text" onClick={logout}>
          登出
        </Button>
      </Menu.Item>
    </Menu>
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
