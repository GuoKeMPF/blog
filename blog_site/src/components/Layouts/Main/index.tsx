import React, { FunctionComponent, ReactElement, ReactNode } from "react";

interface MainPropsType {
  children?: ReactNode | ReactElement;
}

export const Main: FunctionComponent<MainPropsType> = ({ children }) => {
  return <main>{children}</main>;
};
