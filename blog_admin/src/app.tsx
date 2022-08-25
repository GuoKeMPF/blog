import logo from '@/assets/images/logo.png';
import Footer from '@/components/Footer';
import RightContent from '@/components/Header/RightContent';
import { get } from '@/utils/sessionStorage';
import { SettingDrawer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Fragment } from 'react';
import type { RunTimeLayoutConfig } from 'umi';
import defaultSettings from '../config/defaultSettings';
// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
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
    childrenRender: (children: any, props) => {
      return (
        <Fragment>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState: any) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </Fragment>
      );
    },
    ...defaultSettings,
  };
};

export async function getInitialState(): Promise<any> {
  const loginPath = '/user/login';
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    if (!get('username')) {
      history.push(loginPath);
    }
  }
  return {};
}

// export function render(oldRender: () => void) {
//   const loginPath = '/admin/user/login';
//   console.log(location);
//   console.log(history);

//   // 如果没有登录，重定向到 login
//   if (!get('username') && location.pathname !== loginPath) {
//     location.pathname = '/admin/user/login';
//     oldRender();
//   } else {
//     oldRender();
//   }
// }
