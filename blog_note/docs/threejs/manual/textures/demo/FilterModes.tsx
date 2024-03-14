import React, { Fragment, type FC } from "react";
import DemoCell from "./DemoCell";


export const FilterModes: FC = ({ }) => {
  return <Fragment>
    <DemoCell type="filterModes" style={{ width: '100%', height: 250, position: 'relative' }} />
  </Fragment>;
};
export default FilterModes

