/** @format */

import React, { useState, Fragment, useRef } from "react";
import styles from "./MenuIcon.module.scss";
import MenuItem from "./MenuItem";
import { Border } from "./Border";

const navConfig = [
	{
		title: "首页",
		href: "/",
		icon: "home",
	},
	{
		title: "动态",
		href: "/texts",
		icon: "pen",
	},
	{
		title: "相册",
		href: "/picture",
		icon: "xiangce1",
	},
	{
		title: "音乐",
		href: "/audio",
		icon: "yinyue",
	},
];

export const MenuIcon = () => {
	const [expand, setExpand] = useState(false);

	const open = () => {
		setExpand(true);
	};

	const close = () => {
		setExpand(false);
	};

	return (
		<Fragment>
			<div className={styles.container}>
				<div
					className={`${styles.MenuIcon} ${expand ? " " + styles.expand : ""}`}
					onClick={open}
				>
					<div className={styles.icon}></div>
					<div className={styles.icon}></div>
					<div className={styles.icon}></div>
					<div className={styles.icon}></div>
					<div className={styles.icon}></div>
					<div className={styles.icon}></div>
					<div className={styles.icon}></div>
					<div className={styles.icon}></div>
					<div className={styles.icon}></div>
				</div>
				<div
					onClick={close}
					className={`${styles.mask} ${expand ? " " + styles.expand : ""}`}
				></div>
				<div className={styles.items}>
					<div
						className={`${styles.MenuItems} ${expand ? styles.expand : ""}`}
						onClick={close}
					>
						{navConfig.map((item, index) => (
							<MenuItem className={styles.item} key={index} {...item} />
						))}
						<div className={styles.item}>
							<Border></Border>
						</div>
						<div className={styles.item}>
							<Border></Border>
						</div>
						<div className={styles.item}>
							<Border></Border>
						</div>
						<div className={styles.item}>
							<Border></Border>
						</div>
						<div className={styles.item}>
							<Border></Border>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
