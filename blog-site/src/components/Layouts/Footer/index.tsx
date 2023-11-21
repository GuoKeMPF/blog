/** @format */

import beian from "@/assets/images/beian.png";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.scss";
const Footer: React.FC = () => {
	const defaultMessage = "那个老麻的网站";
	const currentYear = new Date().getFullYear();
	return (
		<footer className={styles.footer}>
			<p className={styles.copyright}>
				&copy;{`${currentYear} ${defaultMessage}`}
			</p>
			<div className={styles.info}>
				<Link href={"/"}>主页</Link>
				<a target='_blank' href={"https://admin.mapanfeng.com"}>
					数据管理中心
				</a>
				<a target='_blank' href={"https://beian.miit.gov.cn/"}>
					<Image
						className={styles.beianicon}
						src={beian.src}
						width={beian.width}
						height={beian.height}
						alt='备案号'
					/>
					备案号：皖ICP备2021018570号
				</a>
			</div>
		</footer>
	);
};

export default Footer;
