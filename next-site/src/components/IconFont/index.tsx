import React, { HTMLAttributes } from "react";
import type { FC } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  type: string;
}
const Icons: FC<Props> = ({ type, className }) => {
  return (
    <svg className={`icon ${className}`} aria-hidden="true">
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
};

export default Icons;
