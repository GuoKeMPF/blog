import React, { type FC } from 'react';
import { TorusKnotGeometry } from 'three';
import { CommonGeometry, FormUnitType } from '../component';

const formConfig: FormUnitType[] = [
	{
		label: 'radius',
		defaultValue: 5,
		max: 10,
		min: 1,
		type: 'number',
	},
	{
		label: 'tubeRadius',
		defaultValue: 3,
		max: 60,
		min: 1,
		type: 'number',
	},
	{
		label: 'tubularSegments',
		defaultValue: 48,
		max: 200,
		min: 1,
		type: 'number',
	},
	{
		label: 'radialSegments',
		defaultValue: 8,
		max: 30,
		min: 1,
		type: 'number',
	},
	{
		label: 'p',
		defaultValue: 2,
		max: 30,
		min: 1,
		type: 'number',
	},
	{
		label: 'q',
		defaultValue: 3,
		max: 30,
		min: 1,
		type: 'number',
	}
];

const createGeometry = (data) => {
	const { radius, tubeRadius, tubularSegments, radialSegments, p, q } = data;
	const geometry = new TorusKnotGeometry(
		radius, tubeRadius, tubularSegments, radialSegments, p, q
	);
	return geometry;
};
export const TorusKnotGeometryDemo: FC = ({ }) => {
	return (
		<CommonGeometry
			formConfig={formConfig}
			createGeometry={createGeometry}
		/>
	);
};

export default TorusKnotGeometryDemo;
