import React, { Fragment, type FC } from "react";

import DemoCell from "./DemoCell";

export const MeshStandardMaterialDemo: FC = ({ }) => {
  return <Fragment>
    <DemoCell type="MeshStandardMaterial" style={{ width: 400, height: 400 }} />
  </Fragment>;
};
export default MeshStandardMaterialDemo

