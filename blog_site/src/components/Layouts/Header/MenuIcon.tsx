import React, { useState, Fragment, useRef } from 'react';
import { formatMessage } from '@/utils/formatMessage';
import styles from './MenuIcon.less';
import MenuItem from './MenuItem';
import { Border } from './Border';
import { SyntheticEvent } from 'react';

const navConfig = [
  {
    title: () =>
      formatMessage({ id: 'header_nav_text' }, { defaultMessage: '首页' }) ||
      '首页',
    href: '/',
    icon: 'home',
  },
  {
    title: () =>
      formatMessage({ id: 'header_nav_text' }, { defaultMessage: '动态' }) ||
      '动态',
    href: '/texts',
    icon: 'pen',
  },
  {
    title: () =>
      formatMessage({ id: 'header_nav_picture' }, { defaultMessage: '相册' }) ||
      '相册',
    href: '/picture',
    icon: 'xiangce1',
  },
];

export const MenuIcon = () => {
  const [expand, setExpand] = useState(false);

  const open = () => {
    setExpand(true);
  };

  const close = () => {
    setExpand(false);
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <div
          onClick={close}
          className={`${styles.mask}${expand ? ' ' + styles.expand : ''}`}
        ></div>
        <div
          className={`${styles.MenuIcon}${expand ? ' ' + styles.expand : ''}`}
          onClick={open}
        >
          <div className={styles.icon}></div>
          <div className={styles.icon}></div>
          <div className={styles.icon}></div>
          <div className={styles.icon}></div>
          <div className={styles.icon}></div>
          <div className={styles.icon}></div>
          <div className={styles.icon}></div>
          <div className={styles.icon}></div>
          <div className={styles.icon}></div>
        </div>
        <div className={styles.items}>
          <div
            className={`${styles.MenuItems} ${expand ? styles.expand : ''}`}
            onClick={close}
          >
            {navConfig.map((item, index) => (
              <MenuItem className={styles.item} key={index} {...item} />
            ))}
            <div className={styles.item}>
              <Border></Border>
            </div>
            <div className={styles.item}>
              <Border></Border>
            </div>
            <div className={styles.item}>
              <Border></Border>
            </div>
            <div className={styles.item}>
              <Border></Border>
            </div>
            <div className={styles.item}>
              <Border></Border>
            </div>
            <div className={styles.item}>
              <Border></Border>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
