/** @format */

import { useContext } from "react";

import { Text } from "@/services/API";
import { StoreInterface, zustandContext, useStore } from "../store";
import { StoreApi } from "zustand";

export interface TextStateInterface {
	size: number;
	page: number;
	texts: Text[];
	loading: boolean;
	total: number;
}

export const initTextState: TextStateInterface = {
	size: 0,
	page: 1,
	texts: [],
	loading: false,
	total: 0,
};

export const updateText = (
	set: StoreApi<StoreInterface>["setState"],
	get: StoreApi<StoreInterface>["getState"]
) => {};

export const useText = () => {
	return useStore((store) => ({
		size: store.text.size ?? 10,
		page: store.text.page ?? 1,
		loading: store.text.loading ?? false,
		texts: store.text.texts ?? [],
		total: store.text.total ?? 0,
	}));
};
