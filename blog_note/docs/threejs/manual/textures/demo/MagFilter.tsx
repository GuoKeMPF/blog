import { Col, Row, Typography } from "antd";
import React, { type FC } from "react";
import DemoCell from "./DemoCell";

const { Paragraph } = Typography;

export const MagFilter: FC = ({ }) => {
  return <Row gutter={[16, 16]}>
    <Col xs={20} sm={16} md={12} lg={8} xl={8}>

      <DemoCell type="filterCubeMagNearest" style={{ width: '100%', height: 200 }} />
      <Paragraph>
        <pre> Nearest </pre>
      </Paragraph>
    </Col>
    <Col xs={20} sm={16} md={12} lg={8} xl={8}>

      <DemoCell type="filterCubeMagLinear" style={{ width: '100%', height: 200 }} />
      <Paragraph>
        <pre> Linear </pre>
      </Paragraph>
    </Col>
  </Row>;
}
export default MagFilter
