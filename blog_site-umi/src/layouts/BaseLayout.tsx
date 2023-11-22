import React, { FunctionComponent, ReactNode } from 'react';
import { Header } from '@/components/Layouts/Header';
import { Main } from '@/components/Layouts/Main';
import { Body } from '@/components/Layouts/Body';
import Footer from '@/components/Layouts/Footer';
import { HtmlTitle } from '@/components/HtmlTitle';
import styles from './BaseLayout.less';

const BaseLayout: FunctionComponent<ReactNode> = ({ children }) => {
  return (
    <div className={styles.context}>
      <HtmlTitle />
      <Header />
      <Main>
        <Body>{children}</Body>
      </Main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
