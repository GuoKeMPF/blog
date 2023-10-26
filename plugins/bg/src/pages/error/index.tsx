/** @format */

import { useRef, useEffect } from "react";

import { Game } from "./lib";

const ErrorPage = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		let game: Game;
		if (canvasRef.current) {
			game = new Game({
				element: canvasRef.current,
				onReady: (g) => {
					console.log('g', g);
					g.start()
				}
			});
			console.log('mount');

		}

		return () => { };
	}, []);

	return (
		<div>
			<p>
				Space Invadors destroyed this page! Take revenge on them!
				<br /> Use <span>Space</span> to shoot and <span>←</span>&#160;
				<span>→</span> to move!&#160;&#160;&#160;
				<button id='restart'>Restart</button>
			</p>

			<canvas ref={canvasRef} id='space-invaders' />
		</div>
	);
};

export default ErrorPage;
