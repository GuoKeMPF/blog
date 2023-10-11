import React from 'react';
import { NavLink, useIntl } from 'umi';

import { Context } from '@/components/Layouts/Context';
import { MenuIcon } from './MenuIcon';
import Language from './Language';

import styles from "./index.module.scss";

export const Header = () => {
  const intl = useIntl();
  return (
    <header className={styles.header}>
      <MenuIcon />
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
        <NavLink
          to="/picture"
          className={styles.navlink}
          activeClassName={styles.active}
        >
          {intl.formatMessage({
            id: 'header_nav_picture',
            defaultMessage: '相册',
          })}
        </NavLink>
        <NavLink
          to="/audio"
          className={styles.navlink}
          activeClassName={styles.active}
        >
          {intl.formatMessage({
            id: 'audio',
            defaultMessage: '音乐',
          })}
        </NavLink>
      </nav>
      <Language />
    </header>
  );
};
