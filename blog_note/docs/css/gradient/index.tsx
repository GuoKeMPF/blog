import React, { Fragment, type FC } from "react";
import { Row, Col, Divider } from "antd";
import useStyles from "./index.style";

interface GradientCardProps {
  className?: string,
  title: string
}

const GradientCard: FC<GradientCardProps> = (
  { className = "", title }
) => {
  const { styles } = useStyles();
  return <Fragment>
    <Divider orientation="left">{title}</Divider>
    <div className={`${styles.container} ${className}`}>
    </div>
  </Fragment>
}

export const Gradient: FC = () => {

  const { styles } = useStyles();
  return <Fragment>
    <Row>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <GradientCard title="线性渐变" className={styles.linear}></GradientCard></Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <GradientCard title="径向渐变" className={styles.radial}></GradientCard></Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <GradientCard title="锥形渐变" className={styles.conic}></GradientCard></Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <GradientCard title="重复线形渐变" className={styles.repeatingLinear}></GradientCard></Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <GradientCard title="重复锥形渐变" className={styles.repeatingRadial}></GradientCard></Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <GradientCard title="多个渐变可以混合" className={styles.multiple}></GradientCard></Col>
    </Row>
  </Fragment>;
};

export default Gradient;
