
import { LatheGeometry, Vector2 } from "three";
import { CommonGeometry, FormUnitType, piMarks } from "../component";

import React, { type FC } from "react";



const formConfig: FormUnitType[] = [
	{
		label: 'segments',
		defaultValue: 8,
		max: 30,
		min: 1,
		type: 'number'
	},
	{
		label: 'phiStart',
		defaultValue: Math.PI,
		max: 2 * Math.PI,
		min: 0,
		type: 'number',
		step: 0.01,
		marks: piMarks
	},
	{
		label: 'phiLength',
		defaultValue: Math.PI,
		max: 2 * Math.PI,
		min: 0,
		type: 'number',
		step: 0.01,
		marks: piMarks
	},
]

const createGeometry = (data) => {
	const points: Vector2[] = [];
	for (let i = 0; i < 10; ++i) {
		points.push(new Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
	}

	const { segments, phiStart, phiLength } = data

	const geometry = new LatheGeometry(
		points, segments, phiStart, phiLength);
	return geometry;
}

export const LatheGeometryDemo: FC = () => {
	return <CommonGeometry formConfig={formConfig} createGeometry={createGeometry} />;
};


export default LatheGeometryDemo;




