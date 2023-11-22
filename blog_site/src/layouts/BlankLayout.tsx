/** @format */

import React, { FunctionComponent, ReactElement, ReactNode } from "react";
import { Header } from "@/components/Layouts/Header";
import { Main } from "@/components/Layouts/Main";
import { Body } from "@/components/Layouts/Body";
import Footer from "@/components/Layouts/Footer";
import styles from "./BlankLayout.module.scss";
interface BlankLayoutPropsType {
	children?: ReactNode | ReactElement;
}

const BlankLayout: FunctionComponent<BlankLayoutPropsType> = ({ children }) => {
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
export default BlankLayout;
