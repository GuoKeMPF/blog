import { Col, Row, Typography } from "antd";
import React, { type FC } from "react";
import DemoCell from "./DemoCell";

const { Paragraph } = Typography;


export const FlatShadingDemo: FC = ({ }) => {
  return <Row gutter={[16, 16]}>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      <DemoCell type="smoothShading" />
      <Paragraph>
        <pre>flatShading: false </pre>
      </Paragraph>
    </Col>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      <DemoCell type="flatShading" />
      <Paragraph>
        <pre> flatShading: true </pre>
      </Paragraph>
    </Col>
  </Row>;
};
export default FlatShadingDemo
