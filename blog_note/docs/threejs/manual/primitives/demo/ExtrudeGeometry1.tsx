
import { CubicBezierCurve3, CurvePath, ExtrudeGeometry, Shape, Vector2, Vector3 } from "three";
import { CommonGeometryDemo } from "../component";

import React, { type FC } from "react";

const formConfig = [
  {
    label: 'steps',
    defaultValue: 50,
    max: 100,
    min: 1,
    type: 'number',
  },
  {
    label: 'bevelEnabled',
    defaultValue: true,
    type: 'boolean',
  },
]

const createGeometry = (data) => {
  const outline = new Shape([
    [-2, -0.1], [2, -0.1], [2, 0.6],
    [1.6, 0.6], [1.6, 0.1], [-2, 0.1],
  ].map(p => new Vector2(...p)));

  const x = -2.5;
  const y = -5;
  const shape = new CurvePath();
  const points = [
    [x + 2.5, y + 2.5],
    [x + 2.5, y + 2.5], [x + 2, y], [x, y],
    [x - 3, y], [x - 3, y + 3.5], [x - 3, y + 3.5],
    [x - 3, y + 5.5], [x - 1.5, y + 7.7], [x + 2.5, y + 9.5],
    [x + 6, y + 7.7], [x + 8, y + 4.5], [x + 8, y + 3.5],
    [x + 8, y + 3.5], [x + 8, y], [x + 5, y],
    [x + 3.5, y], [x + 2.5, y + 2.5], [x + 2.5, y + 2.5],
  ].map(p => new Vector3(...p, 0));
  for (let i = 0; i < points.length; i += 3) {
    shape.add(new CubicBezierCurve3(...points.slice(i, i + 4)));
  }

  const extrudeSettings = {
    ...data,
    extrudePath: shape,
  };

  const geometry = new ExtrudeGeometry(outline, extrudeSettings);
  return geometry;
}

export const ExtrudeGeometryDemo: FC = () => {
  return <CommonGeometryDemo formConfig={formConfig} createGeometry={createGeometry} />;
};


export default ExtrudeGeometryDemo;




