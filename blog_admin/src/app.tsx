import { history } from 'umi';
import type { RunTimeLayoutConfig } from 'umi';
import logo from '@/assets/images/logo.png';
import RightContent from '@/components/Header/RightContent';
import Footer from '@/components/Footer';
import { Fragment } from 'react';
import { get } from '@/utils/sessionStorage';

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = () => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: true,
    logo: () => <img src={logo} />,
    onPageChange: () => {
      const loginPath = '/user/login';
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!get('username') && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    footerRender: () => <Footer />,
    menuHeaderRender: undefined,
    childrenRender: (children: any) => {
      return <Fragment>{children}</Fragment>;
    },
  };
};

export function render(oldRender: () => void) {
  const loginPath = '/user/login';
  const { location } = history;
  // 如果没有登录，重定向到 login
  if (!get('username') && location.pathname !== loginPath) {
    history.push(loginPath);
    oldRender();
  } else {
    oldRender();
  }
}
