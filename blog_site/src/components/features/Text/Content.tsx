/** @format */

import React from "react";

import styles from "./Content.module.scss";

import { Text } from "@/services/API";

type Props = Text;

const Content = ({ title = "", description = "", content = "" }: Props) => (
	<div className={styles.container}>
		<p className={styles.title}>{title}</p>
		<p className={styles.description}>{description}</p>
		<section
			className={styles.content}
			dangerouslySetInnerHTML={{ __html: content }}
		></section>
	</div>
);
export default Content;
