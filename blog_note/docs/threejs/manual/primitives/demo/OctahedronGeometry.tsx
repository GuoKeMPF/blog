
import { OctahedronGeometry } from "three";
import { CommonGeometry, FormUnitType } from "../component";

import React, { type FC } from "react";



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
		defaultValue: 0,
		max: 30,
		min: 0,
		type: 'number'
	},
]

const createGeometry = (data) => {
	const { radius, detail } = data

	const geometry = new OctahedronGeometry(radius, detail);
	return geometry;
}

export const OctahedronGeometryDemo: FC = () => {
	return <CommonGeometry formConfig={formConfig} createGeometry={createGeometry} />;
};


export default OctahedronGeometryDemo;




