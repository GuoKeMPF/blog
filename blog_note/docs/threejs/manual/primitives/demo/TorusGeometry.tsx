import React, { type FC } from 'react';
import { TorusGeometry } from 'three';
import { CommonGeometry, FormUnitType, piMarks } from '../component';

const formConfig: FormUnitType[] = [
	{
		label: 'radius',
		defaultValue: 5,
		max: 10,
		min: 1,
		type: 'number',
	},
	{
		label: 'tube',
		defaultValue: 3,
		max: 10,
		min: 1,
		type: 'number',
	},
	{
		label: 'radialSegments',
		defaultValue: 12,
		max: 30,
		min: 1,
		type: 'number',
	},
	{
		label: 'tubularSegments',
		defaultValue: 48,
		max: 60,
		min: 1,
		type: 'number',
	},
	{
		label: 'arc',
		defaultValue: Math.PI * 2,
		max: Math.PI * 2,
		min: 0,
		step: 0.1,
		type: 'number',
		marks: piMarks,
	},
];

const createGeometry = (data) => {
	const { radius, tube, radialSegments, tubularSegments, arc } = data;
	const geometry = new TorusGeometry(
		radius,
		tube,
		radialSegments,
		tubularSegments,
		arc,
	);
	return geometry;
};
export const TorusGeometryDemo: FC = ({ }) => {
	return (
		<CommonGeometry
			formConfig={formConfig}
			createGeometry={createGeometry}
		/>
	);
};

export default TorusGeometryDemo;
