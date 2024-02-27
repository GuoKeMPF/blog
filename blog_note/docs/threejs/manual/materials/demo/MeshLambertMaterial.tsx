import { Col, Row, Typography } from "antd";
import React, { type FC } from "react";
import DemoCell from "./DemoCell";

const { Paragraph } = Typography;


export const MeshPhongMaterialDemo: FC = ({ }) => {
  return <Row gutter={[16, 16]}>
    <Col xs={20} sm={16} md={12} lg={8} xl={8}>

      <DemoCell type="MeshBasicMaterialCompare" style={{ width: '100%', height: 200 }} />
      <Paragraph>
        <pre>
          {
            `Basic
color: 'purple'`
          }
        </pre>
      </Paragraph>
    </Col>
    <Col xs={20} sm={16} md={12} lg={8} xl={8}>

      <DemoCell type="MeshLambertMaterialCompare" style={{ width: '100%', height: 200 }} />
      <Paragraph>
        <pre>{`Lambert
color: 'black'
emissive: 'purple'`}</pre>
      </Paragraph>
    </Col>
    <Col xs={20} sm={16} md={12} lg={8} xl={8}>

      <DemoCell type="MeshPhongMaterialCompare" style={{ width: '100%', height: 200 }} />
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
