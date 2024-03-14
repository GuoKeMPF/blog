import React, { type FC } from "react";

import { TetrahedronGeometry } from "three";

import { CommonGeometry, FormUnitType } from "../component";

const formConfig: FormUnitType[] = [
	{
		label: 'radius',
		defaultValue: 12,
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
	}
]


const createGeometry = (data) => {
	const { radius, detail } = data;
	const geometry = new TetrahedronGeometry(radius, detail);
	return geometry
}
export const TetrahedronGeometryDemo: FC = ({ }) => {
	return <CommonGeometry formConfig={formConfig} createGeometry={createGeometry} />;
};

export default TetrahedronGeometryDemo;
