import React, { FunctionComponent, ReactElement, ReactNode } from "react";
import { Header } from "@/components/Layouts/Header";
import { Main } from "@/components/Layouts/Main";
import { Body } from "@/components/Layouts/Body";
import Footer from "@/components/Layouts/Footer";
import styles from "./BaseLayout.module.scss";
interface BaseLayoutPropsType {
  children?: ReactNode | ReactElement;
}

const BaseLayout: FunctionComponent<BaseLayoutPropsType> = ({ children }) => {
  return (
    <div className={styles.context}>
      <Header></Header>
      <Main>
        <Body>{children}</Body>
      </Main>
      <Footer />
    </div>
  );
};
export default BaseLayout;
