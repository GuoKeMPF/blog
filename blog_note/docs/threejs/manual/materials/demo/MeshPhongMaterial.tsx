import { Col, Row, Typography } from "antd";
import React, { type FC } from "react";
import DemoCell from "./DemoCell";

const { Paragraph } = Typography;


export const MeshPhongMaterialDemo: FC = ({ }) => {
  return <Row gutter={[16, 16]}>
    <Col xs={20} sm={16} md={12} lg={8} xl={8}>

      <DemoCell type="MeshPhongMaterialShininess0" style={{ width: '100%', height: 200 }} />
      <Paragraph>
        <pre> shininess: 0</pre>
      </Paragraph>
    </Col>
    <Col xs={20} sm={16} md={12} lg={8} xl={8}>

      <DemoCell type="MeshPhongMaterialShininess30" style={{ width: '100%', height: 200 }} />
      <Paragraph>
        <pre> shininess: 30</pre>
      </Paragraph>
    </Col>
    <Col xs={20} sm={16} md={12} lg={8} xl={8}>

      <DemoCell type="MeshPhongMaterialShininess150" style={{ width: '100%', height: 200 }} />
      <Paragraph>
        <pre> shininess: 150</pre>
      </Paragraph>
    </Col>
  </Row>;
};
export default MeshPhongMaterialDemo
