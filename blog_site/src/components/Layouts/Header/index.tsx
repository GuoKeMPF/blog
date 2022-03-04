import React from 'react';
import { NavLink, useIntl } from 'umi';

import { Context } from '@/components/Layouts/Context';
import { MenuIcon } from './MenuIcon';
import Language from "./Language";

import styles from './index.less';

export const Header = () => {
  const intl = useIntl();
  return (
    <header className={styles.header}>
      <Context>
        <MenuIcon />
        <Language/>
        <nav className={styles.nav}>
          <NavLink
            exact
            to="/"
            className={styles.navlink}
            activeClassName={styles.active}
          >
            {intl.formatMessage({
              id: 'header_nav_home',
              defaultMessage: '首页',
            })}
          </NavLink>
          <NavLink
            to="/texts"
            className={styles.navlink}
            activeClassName={styles.active}
          >
            {intl.formatMessage({
              id: 'header_nav_text',
              defaultMessage: '日志',
            })}
          </NavLink>
        </nav>
      </Context>
    </header>
  );
};
