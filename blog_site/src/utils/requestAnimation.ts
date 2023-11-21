/** @format */

import { AudioAnalyserStatus } from "./audioAnalyser";

type RequestAnimationProps = {
	callback: Function;
};

type RequestAnimationStatustype = {
	init: "init";
	running: "running";
	stop: "stop";
};

export const RequestAnimationStatus: RequestAnimationStatustype = {
	init: "init",
	running: "running",
	stop: "stop",
};

export default class RequestAnimation {
	callback: Function;
	requestID: number | undefined;
	status: "init" | "running" | "stop" = "init";
	constructor(props: RequestAnimationProps) {
		this.callback = props.callback;
	}
	start = () => {
		const animation = () => {
			if (
				this.status === RequestAnimationStatus.running ||
				this.status === RequestAnimationStatus.init
			) {
				this.callback();
				this.requestID = requestAnimationFrame(animation);
			}
			if (this.status === RequestAnimationStatus.stop) {
				if (this.requestID) {
					cancelAnimationFrame(this.requestID);
				}
			}
		};
		if (
			this.status === RequestAnimationStatus.init ||
			this.status === RequestAnimationStatus.stop
		) {
			this.status = RequestAnimationStatus.running;
			animation();
		}
	};
	stop = () => {
		this.status = RequestAnimationStatus.stop;
	};
}
