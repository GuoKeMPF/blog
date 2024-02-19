import React, { type FC } from "react";



import { PolyhedronGeometry } from "three";

import { CommonGeometry, FormUnitType } from "../component";



const formConfig: FormUnitType[] = [
	{
		label: 'radius',
		defaultValue: 8,
		max: 30,
		min: 1,
		type: 'number'
	},
	{
		label: 'detail',
		defaultValue: 2,
		max: 30,
		min: 0,
		type: 'number'
	},
]


const createGeometry = (data) => {
	const { radius, detail } = data;
	const verticesOfCube = [
		- 1, - 1, - 1,
		1, - 1, - 1,
		1, 1, - 1,
		- 1, 1, - 1,
		- 1, - 1, 1,
		1, - 1, 1,
		1, 1, 1,
		- 1, 1, 1,
	];
	const indicesOfFaces = [
		2, 1, 0, 0, 3, 2,
		0, 4, 7, 7, 3, 0,
		0, 1, 5, 5, 4, 0,
		1, 2, 6, 6, 5, 1,
		2, 3, 7, 7, 6, 2,
		4, 5, 6, 6, 7, 4,
	];

	const geometry = new PolyhedronGeometry(verticesOfCube, indicesOfFaces, radius, detail);
	return geometry;
}
export const PolyhedronGeometryDemo: FC = ({ }) => {
	return <CommonGeometry formConfig={formConfig} createGeometry={createGeometry} />;
};

export default PolyhedronGeometryDemo;
