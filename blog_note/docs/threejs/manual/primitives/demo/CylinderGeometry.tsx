import React, { FC } from 'react';
import { CylinderGeometry, } from 'three';


import { CommonGeometry, FormUnitType, piMarks } from "../component";


const formConfig: FormUnitType[] = [
	{
		label: 'radiusTop',
		defaultValue: 8,
		max: 30,
		min: 0,
		type: 'number',
	},
	{
		label: 'radiusBottom',
		defaultValue: 8,
		max: 30,
		min: 0,
		type: 'number',
	},
	{
		label: 'height',
		defaultValue: 8,
		max: 30,
		min: 0,
		type: 'number',
	},
	{
		label: 'radialSegments',
		defaultValue: 8,
		max: 30,
		min: 0,
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
		label: 'openEnded',
		defaultValue: true,
		type: 'boolean',
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
]


export const CylinderGeometryDemo: FC = ({ }) => {


	const createGeometry = (data) => {
		const { radiusTop, radiusBottom, height,
			radialSegments, heightSegments,
			openEnded,
			thetaStart, thetaLength } = data
		const geometry = new CylinderGeometry(radiusTop, radiusBottom, height,
			radialSegments, heightSegments,
			openEnded,
			thetaStart, thetaLength)
		return geometry
	}




	return (<CommonGeometry formConfig={formConfig} createGeometry={createGeometry} />);

};


export default CylinderGeometryDemo;
