import React, { FC } from 'react';
import { ConeGeometry, } from 'three';

import { CommonGeometry, FormUnitType, piMarks } from "../component";



const formConfig: FormUnitType[] = [
	{
		label: 'radius',
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
		label: 'heightSegments',
		defaultValue: 8,
		max: 30,
		min: 1,
		type: 'number',
	},
	{
		label: 'thetaStart',
		defaultValue: 0,
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
	{
		label: 'openEnded',
		defaultValue: true,
		type: 'boolean',
	},
]


export const ConeGeometryDemo: FC = ({ }) => {


	const createGeometry = (data) => {
		const geometry = new ConeGeometry(
			data.radius, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength
		)
		return geometry;
	}



	return (<CommonGeometry formConfig={formConfig} createGeometry={createGeometry} />);

};


export default ConeGeometryDemo;
