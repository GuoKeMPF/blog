import { useState, useEffect, useCallback } from "react";

const useWindowResize = () => {
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});

	const onResize = useCallback(() => {
		setSize({
			width: document?.documentElement?.clientWidth,
			height: document?.documentElement?.clientHeight,
		});
	}, []);

	useEffect(() => {
		onResize();
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return size;
};

export default useWindowResize;
