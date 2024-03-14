/** @format */

import { defineConfig } from "umi";

export default defineConfig({
	routes: [
		{ path: "/", component: "index" },
		{ path: "/error", component: "error/index" },
		{ path: "/docs", component: "docs" },
	],
	npmClient: "yarn",
});
