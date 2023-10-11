import React, { Fragment } from "react";
import Link from "next/link";

interface RoutersType {
  title: string;
  path?: string;
  notToot?: true;
  children?: RoutersType;
}

const Breadcrumb = ({ routers }: { routers: RoutersType }) => {
  const { title = "", path = "", children, notToot = false } = routers;
  const breadNode = path ? (
    <Link href={path}>{title}</Link>
  ) : (
    <span>{title}</span>
  );
  if (children && Object.keys(children).length > 0) {
    if (notToot) {
      return (
        <Fragment>
          {breadNode}
          &nbsp; / &nbsp;
          {Breadcrumb({ routers: { ...children, notToot: true } })}
        </Fragment>
      );
    } else {
      return (
        <p>
          {breadNode}
          &nbsp; / &nbsp;
          {Breadcrumb({ routers: { ...children, notToot: true } })}
        </p>
      );
    }
  } else {
    return <Fragment>{breadNode}</Fragment>;
  }
};

export default Breadcrumb;
