/** @format */

import React, { FC } from "react";
import styles from "./TextItem.module.scss";

import Link from "next/link";
import { Text } from "@/services/API";

interface PageProps {
	text: Text;
}

export const TextItem: FC<PageProps> = ({ text }) => {
	const { id, title = "", description = "", content = "" } = text;
	return (
		<Link href={`/text/${id}`} className={styles.text}>
			<p className={styles.title}>{title}</p>
			<p className={styles.description}>{description}</p>
		</Link>
	);
};

export default TextItem;
