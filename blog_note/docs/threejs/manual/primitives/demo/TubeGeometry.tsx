import React, { type FC } from 'react';
import { TubeGeometry, Curve, Vector3 } from 'three';
import { CommonGeometry, FormUnitType } from '../component';

const formConfig: FormUnitType[] = [
  {
    label: 'tubularSegments',
    defaultValue: 24,
    max: 200,
    min: 1,
    type: 'number',
  },
  {
    label: 'radialSegments',
    defaultValue: 32,
    max: 80,
    min: 1,
    type: 'number',
  },
  {
    label: 'radius',
    defaultValue: 1,
    max: 30,
    min: 1,
    type: 'number',
  },
  {
    label: 'closed',
    defaultValue: false,
    type: 'boolean',
  }
];


class CustomSinCurve extends Curve<Vector3> {
  scale: number;

  constructor(scale) {
    super();
    this.scale = scale;
  }
  getPoint(t) {
    const tx = t * 3 - 1.5;
    const ty = Math.sin(2 * Math.PI * t);
    const tz = 0;
    return new Vector3(tx, ty, tz).multiplyScalar(this.scale);
  }
}



const createGeometry = (data) => {
  const path = new CustomSinCurve(4);
  const { tubularSegments, radius, radialSegments, closed } = data;
  const geometry = new TubeGeometry(path, tubularSegments, radius, radialSegments, closed);
  return geometry;
};
export const TubeGeometryDemo: FC = ({ }) => {
  return (
    <CommonGeometry
      formConfig={formConfig}
      createGeometry={createGeometry}
    />
  );
};

export default TubeGeometryDemo;
