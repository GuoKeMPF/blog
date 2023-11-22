/** @format */

import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";
import * as path from "path";

export default (appInfo: EggAppInfo) => {
	const config: PowerPartial<EggAppConfig> = {};
	config.logger = {
		dir: path.join(appInfo.baseDir, "logs"),
		level: "INFO",
		consoleLevel: "WARN",
	};
	return config;
};
