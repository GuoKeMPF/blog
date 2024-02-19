
import { ExtrudeGeometry, Shape } from "three";
import { CommonGeometry, FormUnitType } from "../component";

import React, { type FC } from "react";

const formConfig: FormUnitType[] = [
	{
		label: 'steps',
		defaultValue: 2,
		max: 30,
		min: 1,
		type: 'number',
	},
	{
		label: 'depth',
		defaultValue: 2,
		max: 30,
		min: 1,
		type: 'number',
	},
	{
		label: 'bevelEnabled',
		defaultValue: true,
		type: 'boolean',
	},
	{
		label: 'bevelThickness',
		defaultValue: 1,
		max: 4,
		min: 0,
		type: 'number',
	},
	{
		label: 'bevelSize',
		defaultValue: 1,
		max: 4,
		min: 0,
		type: 'number',
	},
	{
		label: 'bevelSegments',
		defaultValue: 1,
		max: 4,
		min: 0,
		type: 'number',
	},
]

const createGeometry = (data) => {
	const shape = new Shape();
	const x = -2.5;
	const y = -5;
	shape.moveTo(x + 2.5, y + 2.5);
	shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
	shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
	shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
	shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
	shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
	shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
	const extrudeSettings = { ...data };
	const geometry = new ExtrudeGeometry(shape, extrudeSettings);
	return geometry
}

export const ExtrudeGeometryDemo: FC = () => {
	return <CommonGeometry formConfig={formConfig} createGeometry={createGeometry} />;
};


export default ExtrudeGeometryDemo;




