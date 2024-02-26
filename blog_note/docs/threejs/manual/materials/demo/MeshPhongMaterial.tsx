import { Col, Row, Typography } from "antd";
import React, { type FC } from "react";
import DemoCell from "./DemoCell";

const { Paragraph } = Typography;


export const MeshPhongMaterialDemo: FC = ({ }) => {
  return <Row gutter={[16, 16]}>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>

      <DemoCell type="MeshPhongMaterialShininess0" />
      <Paragraph>
        <pre> shininess: 0</pre>
      </Paragraph>
    </Col>
    <Col xs={20} sm={16} md={12} lg={8} xl={4}>

      <DemoCell type="MeshPhongMaterialShininess30" />
      <Paragraph>
        <pre> shininess: 30</pre>
      </Paragraph>
    </Col>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>

      <DemoCell type="MeshPhongMaterialShininess150" />
      <Paragraph>
        <pre> shininess: 150</pre>
      </Paragraph>
    </Col>
  </Row>;
};
export default MeshPhongMaterialDemo
