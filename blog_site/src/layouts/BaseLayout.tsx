import React, { FunctionComponent, ReactNode } from 'react';
import { Header } from '@/components/Layouts/Header';
import { Main } from '@/components/Layouts/Main';
import { Context } from '@/components/Layouts/Context';
import Footer from '@/components/Layouts/Footer';
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
      <Footer />
    </div>
  );
};

export default BaseLayout;
