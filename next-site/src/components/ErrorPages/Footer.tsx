import React, { Fragment, type FC, type ReactNode } from "react";
import Link from "next/link";

import styles from './Footer.module.scss';

type FooterProps = {
    actions?: ReactNode
};

export const Footer: FC<FooterProps> = ({ actions }) => {
    return <footer className={styles.footer}>
        <Link href={'/'}>
            返回首页
            {actions}
        </Link>
    </footer>;
};
