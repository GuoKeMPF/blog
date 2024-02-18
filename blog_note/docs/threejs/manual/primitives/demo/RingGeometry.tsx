import React, { type FC } from "react";



import { RingGeometry } from "three";

import { CommonGeometryDemo, FormUnitType, piMarks } from "../component";



const formConfig: FormUnitType[] = [
  {
    label: 'innerRadius',
    defaultValue: 2,
    max: 30,
    min: 1,
    type: 'number'
  },
  {
    label: 'outerRadius',
    defaultValue: 8,
    max: 30,
    min: 0,
    type: 'number'
  },
  {
    label: 'thetaSegments',
    defaultValue: 8,
    max: 30,
    min: 3,
    type: 'number'
  },
  {
    label: 'phiSegments',
    defaultValue: 8,
    max: 30,
    min: 1,
    type: 'number'
  },
  {
    label: 'thetaStart',
    defaultValue: Math.PI,
    max: Math.PI * 2,
    min: 0,
    step: 0.1,
    type: 'number',
    marks: piMarks
  },
  {
    label: 'thetaLength',
    defaultValue: Math.PI * 2,
    max: Math.PI * 2,
    min: 0,
    step: 0.1,
    type: 'number',
    marks: piMarks
  },
]


const createGeometry = (data) => {
  const {
    innerRadius, outerRadius,
    thetaSegments, phiSegments,
    thetaStart, thetaLength } = data;
  const geometry = new RingGeometry(
    innerRadius, outerRadius,
    thetaSegments, phiSegments,
    thetaStart, thetaLength)
  return geometry;
}
export const RingGeometryDemo: FC = ({ }) => {
  return <CommonGeometryDemo formConfig={formConfig} createGeometry={createGeometry} />;
};

export default RingGeometryDemo;
