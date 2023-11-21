/** @format */

import { createContext } from "react";

type PictureContextType = {
	visiable: boolean;
	setVisiable: (visiable: boolean) => void;
	select: any;
	setSelect: (d: any) => void;
};

export const PictureContext = createContext<PictureContextType>({
	visiable: false,
	setVisiable: (visiable: boolean) => {},
	select: undefined,
	setSelect: (d: any) => {},
});
