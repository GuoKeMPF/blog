import React from "react";
import type { FC, ReactElement } from "react";
import Background from "@/components/Background";
import BaseLayout from "@/layouts/BaseLayout";

import styles from "./index.module.scss";

import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <div id="home" className={styles.body}>
      <div className={styles.context}></div>
      <Background />
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Home;
