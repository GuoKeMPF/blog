import React from 'react';
import { BoxGeometry, SphereGeometry, WireframeGeometry } from 'three';


import { CommonEdgesGeometry, FormUnitType } from "../component";

const formConfig: FormUnitType[] = [
  {
    label: 'size',
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



const WireframeGeometryDemo = () => {
  const createGeometry = (data) => {
    const { size, widthSegments, heightSegments, depthSegments } = data
    const sphereGeometry = new BoxGeometry(size, size, size, widthSegments, heightSegments, depthSegments);
    const geometry = new WireframeGeometry(sphereGeometry);
    return geometry;
  }

  return <CommonEdgesGeometry formConfig={formConfig} createGeometry={createGeometry} />;

};

export default WireframeGeometryDemo;
