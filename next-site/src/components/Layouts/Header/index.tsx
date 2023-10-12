/** @format */

import React from "react";
import Link from "next/link";
import { MenuIcon } from "./MenuIcon";

import styles from "./index.module.scss";

export const Header = () => {
	return (
		<header className={styles.header}>
			<MenuIcon />
			<nav className={styles.nav}>
				<Link href='/' className={styles.navlink}>
					首页
				</Link>
				<Link href='/texts' className={styles.navlink}>
					日志
				</Link>
				<Link href='/picture' className={styles.navlink}>
					相册
				</Link>
				<Link href='/audio' className={styles.navlink}>
					音乐
				</Link>
			</nav>
		</header>
	);
};
