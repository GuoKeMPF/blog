import React from 'react';
import { BufferAttribute, BufferGeometry } from 'three';

import { CommonGeometryDemo } from "../component";

const BufferGeometryDemo = () => {

  const createGeometry = () => {

    const geometry = new BufferGeometry();
    // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
    // 因为在两个三角面片里，这两个顶点都需要被用到。
    const vertices = new Float32Array([
      -1.0, -1.0, 1.0,
      1.0, -1.0, 1.0,
      1.0, 1.0, 1.0,

      1.0, 1.0, 1.0,
      -2.0, 2.0, 1.0,
      -1.0, -1.0, 1.0,

      -1.0, -1.0, 1.0,
      -1.0, -1.0, -1.0,
      -1.0, 1.0, -1.0,

      -1.0, -1.0, -1.0,
      -1.0, -1.0, -1.0,
      1.0, -1.0, -1.0,
    ]);

    // itemSize = 3 因为每个顶点都是一个三元组。
    geometry.setAttribute('position', new BufferAttribute(vertices, 3));
    return geometry;
  }



  return (<CommonGeometryDemo formConfig={[]} createGeometry={createGeometry} />);
};

export default BufferGeometryDemo;
