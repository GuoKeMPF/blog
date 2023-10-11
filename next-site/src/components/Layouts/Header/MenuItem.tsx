import React, { FC } from "react";
import Link from "next/link";
import { Border } from "./Border";
import IconFont from "@/components/IconFont";
import styles from "./MenuItem.module.scss";

interface MenuItemType {
  title: string | object;
  href: string;
  icon: string;
  className?: string;
}

const MenuItem: FC<MenuItemType> = ({ title, href, icon, className }) => (
  <Link href={href} className={`${className} ${styles.item}`}>
    <Border>
      <div className={styles.content}>
        <IconFont className={styles.icon} type={icon} />
      </div>
    </Border>
  </Link>
);

export default MenuItem;
