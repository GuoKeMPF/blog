import { Col, Row, Typography } from "antd";
import React, { type FC } from "react";
import DemoCell from "./DemoCell";

const { Paragraph } = Typography;


export const MeshPhongMaterialDemo: FC = ({ }) => {
  return <Row gutter={[16, 16]}>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>

      <DemoCell type="MeshBasicMaterialCompare" />
      <Paragraph>
        <pre>
          {
            `Basic
color: 'purple'`
          }
        </pre>
      </Paragraph>
    </Col>
    <Col xs={20} sm={16} md={12} lg={8} xl={4}>

      <DemoCell type="MeshLambertMaterialCompare" />
      <Paragraph>
        <pre>{`Lambert
color: 'black'
emissive: 'purple'`}</pre>
      </Paragraph>
    </Col>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>

      <DemoCell type="MeshPhongMaterialCompare" />
      <Paragraph>
        <pre>{`Phong
color: 'black'
emissive: 'purple'
shininess: 0`}</pre>
      </Paragraph>
    </Col>
  </Row>;
};
export default MeshPhongMaterialDemo
