import React, { type FC } from "react";

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { CommonGeometryDemo, FormUnitType } from "../component";
import typeface from './font/typeface.json';

const formConfig: FormUnitType[] = [
  {
    label: 'text',
    defaultValue: 'three.js',
    type: 'text'
  },
  {
    label: 'size',
    defaultValue: 5,
    max: 10,
    min: 1,
    type: 'number'
  },
  {
    label: 'height',
    defaultValue: 3,
    max: 10,
    min: 1,
    type: 'number'
  },
  {
    label: 'curveSegments',
    defaultValue: 2,
    max: 20,
    min: 1,
    type: 'number'
  },
  {
    label: 'bevelEnabled',
    defaultValue: true,
    type: 'boolean'
  },
  {
    label: 'bevelThickness',
    defaultValue: 0.8,
    max: 5,
    min: 1,
    type: 'number'
  },
  {
    label: 'bevelSize',
    defaultValue: 1,
    max: 5,
    min: 1,
    type: 'number'
  },
  {
    label: 'bevelSegments',
    defaultValue: 2,
    max: 5,
    min: 1,
    type: 'number'
  },
]


const createGeometry = (data) => {
  const { text, size, height, curveSegments, bevelEnabled, bevelThickness, bevelSize, bevelSegments } = data;


  const loader = new FontLoader();

  const font = loader.parse(typeface);
  const geometry = new TextGeometry(text, {
    font: font,
    size,
    height,
    curveSegments,
    bevelEnabled,
    bevelThickness,
    bevelSize,
    bevelSegments,
  });
  return geometry
}
export const TextGeometryDemo: FC = ({ }) => {
  return <CommonGeometryDemo formConfig={formConfig} createGeometry={createGeometry} />;
};

export default TextGeometryDemo;
