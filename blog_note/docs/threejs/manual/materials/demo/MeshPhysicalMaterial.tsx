import React, { Fragment, type FC } from "react";
import DemoCell from "./DemoCell";


export const MeshPhysicalMaterialDemo: FC = ({ }) => {
  return <Fragment>
    <DemoCell type="MeshPhysicalMaterial" style={{ width: 400, height: 400 }} />
  </Fragment>;
};
export default MeshPhysicalMaterialDemo


