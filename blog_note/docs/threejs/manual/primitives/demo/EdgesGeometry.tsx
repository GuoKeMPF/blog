import React from 'react';
import { SphereGeometry, EdgesGeometry } from 'three';


import { CommonEdgesGeometry, FormUnitType } from "../component";

const formConfig: FormUnitType[] = [

  {
    label: 'thresholdAngle',
    defaultValue: 1,
    max: 180,
    min: 1,
    type: 'number',
  }
]



const EdgesGeometryDemo = () => {
  const createGeometry = (data) => {
    const { thresholdAngle } = data
    const radius = 7;
    const widthSegments = 6;
    const heightSegments = 3;
    const sphereGeometry = new SphereGeometry(radius, widthSegments, heightSegments);
    const geometry = new EdgesGeometry(sphereGeometry, thresholdAngle);
    return geometry;
  }

  return <CommonEdgesGeometry formConfig={formConfig} createGeometry={createGeometry} />;

};

export default EdgesGeometryDemo;
