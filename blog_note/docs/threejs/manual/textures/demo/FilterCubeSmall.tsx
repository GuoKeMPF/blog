import React, { Fragment, type FC } from "react";
import DemoCell from "./DemoCell";


export const FilterCubeSmall: FC = ({ }) => {
  return <Fragment>
    <DemoCell type="filterCubeSmall" style={{ width: '100%', height: 200 }} />
  </Fragment>;
};
export default FilterCubeSmall
