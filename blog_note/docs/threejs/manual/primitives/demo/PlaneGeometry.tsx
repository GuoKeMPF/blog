

import { PlaneGeometry } from "three";

import { CommonGeometryDemo, FormUnitType } from "../component";

import React, { type FC } from "react";



const formConfig: FormUnitType[] = [
  {
    label: 'width',
    defaultValue: 8,
    max: 30,
    min: 1,
    type: 'number'
  },
  {
    label: 'height',
    defaultValue: 8,
    max: 30,
    min: 0,
    type: 'number'
  },
  {
    label: 'widthSegments',
    defaultValue: 8,
    max: 30,
    min: 0,
    type: 'number'
  },
  {
    label: 'heightSegments',
    defaultValue: 8,
    max: 30,
    min: 0,
    type: 'number'
  }
]

const createGeometry = (data) => {
  const { width, height, widthSegments, heightSegments } = data
  const geometry = new PlaneGeometry(width, height, widthSegments, heightSegments);
  return geometry;
}

export const PlaneGeometryDemo: FC = () => {
  return <CommonGeometryDemo formConfig={formConfig} createGeometry={createGeometry} />;
};


export default PlaneGeometryDemo;




