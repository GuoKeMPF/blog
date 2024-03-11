import React, { Fragment, type FC, } from "react";
import { Divider, Flex } from "antd";
import DemoCell from "./DemoCell";
export const MaterialCubeDemo: FC = ({ }) => {




  return <Fragment>

    <Divider orientation="left">Basic</Divider>
    <Flex gap="middle">
      <DemoCell type="MeshBasicMaterial" />
      <DemoCell type="MeshBasicMaterialLowPoly" />
    </Flex>

    <Divider orientation="left">Lambert</Divider>
    <Flex gap="middle">
      <DemoCell type="MeshLambertMaterial" />
      <DemoCell type="MeshLambertMaterialLowPoly" />
    </Flex>


    <Divider orientation="left">Phong</Divider>
    <Flex gap="middle">
      <DemoCell type="MeshPhongMaterial" />
      <DemoCell type="MeshPhongMaterialLowPoly" />
    </Flex>
  </Fragment>;
};

export default MaterialCubeDemo
