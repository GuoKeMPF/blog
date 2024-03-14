import React, { FC } from 'react';
import { CircleGeometry } from 'three';


import { CommonGeometry, FormUnitType, piMarks } from "../component";

const formConfig: FormUnitType[] = [
	{
		label: 'radius',
		defaultValue: 8,
		max: 30,
		min: 0,
		type: 'number'
	},
	{
		label: 'segments',
		defaultValue: 8,
		max: 30,
		min: 1,
		type: 'number',
	},
	{
		label: 'thetaStart',
		defaultValue: Math.PI,
		max: Math.PI * 2.00,
		min: 0,
		type: 'number',
		step: 0.01,
		marks: piMarks
	},
	{
		label: 'thetaLength',
		defaultValue: Math.PI * 2.00,
		max: Math.PI * 2.00,
		min: 0,
		type: 'number',
		step: 0.01,
		marks: piMarks
	},
]



export const CircleGeometryDemo: FC = ({ }) => {

	const createGeometry = (data) => {
		const geometry = new CircleGeometry(
			data.radius, data.segments, data.thetaStart, data.thetaLength
		);
		return geometry;
	}



	return (<CommonGeometry formConfig={formConfig} createGeometry={createGeometry} />);
};


export default CircleGeometryDemo;
