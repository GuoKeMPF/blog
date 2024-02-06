
import { IcosahedronGeometry } from "three";
import { CommonGeometryDemo } from "../component";

import React, { type FC } from "react";

const formConfig = [
  {
    label: 'radius',
    defaultValue: 8,
    max: 30,
    min: 1,
    type: 'number',
  },
  {
    label: 'detail',
    defaultValue: 0,
    max: 10,
    min: 0,
    type: 'number',
  },
]

const createGeometry = (data) => {
  const { radius, detail } = data
  const geometry = new IcosahedronGeometry(radius, detail);
  return geometry;
}

export const ExtrudeGeometryDemo: FC = () => {
  return <CommonGeometryDemo formConfig={formConfig} createGeometry={createGeometry} />;
};


export default ExtrudeGeometryDemo;




