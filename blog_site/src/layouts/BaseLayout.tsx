import React, { FunctionComponent, ReactNode } from 'react';
import { Header } from '@/components/Layouts/Header/index';
import { Main } from '@/components/Layouts/Main/index';
import { Context } from '@/components/Layouts/Context';
import { HtmlTitle } from '@/components/HtmlTitle';
import styles from './BaseLayout.less';

const BaseLayout: FunctionComponent<ReactNode> = ({ children }) => {
  return (
    <div className={styles.context}>
      <HtmlTitle />
      <Header />
      <Main>
        <Context>{children}</Context>
      </Main>
    </div>
  );
};

export default BaseLayout;
