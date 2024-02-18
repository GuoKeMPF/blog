import React, { FC } from 'react';
import { DodecahedronGeometry, } from 'three';

import { CommonGeometryDemo, FormUnitType } from "../component";

const formConfig: FormUnitType[] = [
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
    max: 30,
    min: 0,
    type: 'number',
  }
]

export const DodecahedronGeometryDemo: FC = ({ }) => {
  const createGeometry = (data) => {
    const { radius, detail } = data
    const geometry = new DodecahedronGeometry(radius, detail)
    return geometry
  }

  return (<CommonGeometryDemo formConfig={formConfig} createGeometry={createGeometry} />);
};

export default DodecahedronGeometryDemo
