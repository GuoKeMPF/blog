import React, { type FC } from "react";

import { SphereGeometry } from "three";

import { CommonGeometryDemo, FormUnitType, piMarks } from "../component";

const formConfig: FormUnitType[] = [
  {
    label: 'radius',
    defaultValue: 12,
    max: 30,
    min: 1,
    type: 'number'
  },
  {
    label: 'widthSegments',
    defaultValue: 16,
    max: 30,
    min: 2,
    type: 'number'
  },
  {
    label: 'heightSegments',
    defaultValue: 2,
    max: 30,
    min: 2,
    type: 'number'
  },
  {
    label: 'phiStart',
    defaultValue: 0,
    max: Math.PI * 2,
    min: 0,
    step: 0.1,
    type: 'number',
    marks: piMarks,
  },
  {
    label: 'phiLength',
    defaultValue: Math.PI,
    max: Math.PI * 2,
    min: 0,
    step: 0.1,
    type: 'number',
    marks: piMarks,
  },
  {
    label: 'thetaStart',
    defaultValue: 0,
    max: Math.PI * 2,
    min: 0,
    step: 0.1,
    type: 'number',
    marks: piMarks,
  },
  {
    label: 'thetaLength',
    defaultValue: Math.PI,
    max: Math.PI * 2,
    min: 0,
    step: 0.1,
    type: 'number',
    marks: piMarks,
  },
]


const createGeometry = (data) => {
  const {
    radius,
    widthSegments, heightSegments,
    phiStart, phiLength,
    thetaStart, thetaLength } = data;
  const geometry = new SphereGeometry(
    radius,
    widthSegments, heightSegments,
    phiStart, phiLength,
    thetaStart, thetaLength);
  return geometry
}
export const SphereGeometryDemo: FC = ({ }) => {
  return <CommonGeometryDemo formConfig={formConfig} createGeometry={createGeometry} />;
};

export default SphereGeometryDemo;
