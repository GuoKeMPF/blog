import React from 'react';
import { BoxGeometry } from 'three';


import { CommonGeometry, FormUnitType } from "../component";

const formConfig: FormUnitType[] = [

  {
    label: 'width',
    defaultValue: 8,
    max: 30,
    min: 1,
    type: 'number',
  },
  {
    label: 'height',
    defaultValue: 8,
    max: 30,
    min: 1,
    type: 'number',
  },
  {
    label: 'depth',
    defaultValue: 8,
    max: 30,
    min: 1,
    type: 'number',
  },
  {
    label: 'widthSegments',
    defaultValue: 1,
    max: 30,
    min: 1,
    type: 'number',
  },
  {
    label: 'heightSegments',
    defaultValue: 1,
    max: 30,
    min: 1,
    type: 'number',
  },
  {
    label: 'depthSegments',
    defaultValue: 1,
    max: 30,
    min: 1,
    type: 'number',
  },
]



const BoxGeometryDemo = () => {


  const createGeometry = (data) => {
    const geometry = new BoxGeometry(
      data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments
    )
    return geometry;
  }

  return <CommonGeometry formConfig={formConfig} createGeometry={createGeometry} />;

};

export default BoxGeometryDemo;
