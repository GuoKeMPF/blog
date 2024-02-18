

import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { CommonGeometryDemo, FormUnitType } from "../component";

import React, { type FC } from "react";



const formConfig: FormUnitType[] = [
  {
    label: 'slices',
    defaultValue: 8,
    max: 30,
    min: 1,
    type: 'number'
  },
  {
    label: 'stacks',
    defaultValue: 8,
    max: 30,
    min: 0,
    type: 'number'
  },
]

const createGeometry = (data) => {
  const { slices, stacks } = data
  function klein(v, u, target) {

    u *= Math.PI;
    v *= 2 * Math.PI;
    u = u * 2;

    let x;
    let z;

    if (u < Math.PI) {

      x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
      z = - 8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);

    } else {

      x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
      z = - 8 * Math.sin(u);

    }

    const y = - 2 * (1 - Math.cos(u) / 2) * Math.sin(v);

    target.set(x, y, z).multiplyScalar(0.75);

  }

  const geometry = new ParametricGeometry(klein, slices, stacks);
  return geometry;
}

export const ParametricGeometryDemo: FC = () => {
  return <CommonGeometryDemo formConfig={formConfig} createGeometry={createGeometry} />;
};


export default ParametricGeometryDemo;




