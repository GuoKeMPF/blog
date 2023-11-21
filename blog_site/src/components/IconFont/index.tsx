/** @format */

import React, { HTMLAttributes } from "react";
import type { FC } from "react";
import styles from "./index.module.scss";

interface Props extends HTMLAttributes<HTMLElement> {
	type: string;
	spin?: boolean;
}
const Icons: FC<Props> = ({ type, className, spin = false }) => {
	return (
		<span
			role='img'
			className={`${className} ${spin ? styles.spin : ""}`}
			aria-label={`${type}`}
		>
			<svg className={`icon`} aria-hidden='true'>
				<use xlinkHref={`#${type}`}></use>
			</svg>
		</span>
	);
};

export default Icons;
