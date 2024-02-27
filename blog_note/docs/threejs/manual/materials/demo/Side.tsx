import { Col, Row, Typography } from "antd";
import React, { type FC } from "react";
import DemoCell from "./DemoCell";

const { Paragraph } = Typography;



export const SideDemo: FC = ({ }) => {
  return <Row gutter={[16, 16]}>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      <DemoCell type="sideDefault" />
      <Paragraph>
        <pre>side: THREE.FrontSide</pre>
      </Paragraph>
    </Col>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      <DemoCell type="sideDouble" />
      <Paragraph>
        <pre> side: THREE.DoubleSide</pre>
      </Paragraph>
    </Col>
  </Row>;
};
export default SideDemo

