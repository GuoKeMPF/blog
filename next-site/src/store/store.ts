/** @format */

import { createContext, useContext } from "react";
import { createStore, useStore as useZustandStore } from "zustand";

import { initTextState, updateText } from "./stores";
import { type TextStateInterface } from "./stores";

export interface StoreInterface {
	text: Partial<TextStateInterface>;
	updateText: () => void;
}

const getDefaultInitialState = () => ({
	text: initTextState,
});

export type StoreType = ReturnType<typeof initializeStore>;

export const zustandContext = createContext<StoreType | null>(null);

export const Provider = zustandContext.Provider;

export const useStore = <T>(selector: (state: StoreInterface) => T) => {
	const store = useContext(zustandContext);
	if (!store) throw new Error("Store is missing the provider");
	return useZustandStore(store, selector);
};

export const initializeStore = (
	preloadedState: Partial<StoreInterface> = {}
) => {
	return createStore<StoreInterface>((set, get) => ({
		...getDefaultInitialState(),
		...preloadedState,
		updateText: () => updateText(set, get),
	}));
};
