/** @format */

import { useRef, useState, useEffect } from "react";
import type { ReactElement } from "react";

import Link from "next/link";

import { Game, blocks404 } from "@/utils/game";
import styles from "./error.module.scss";
import BlankLayout from "@/layouts/BlankLayout";
import { NextPageWithLayout } from "./_app";
import { Footer } from "@/components/ErrorPages";

const Page404: NextPageWithLayout = () => {
	const canvasRef = useRef(null);
	const [game, setGame] = useState<Game>();
	const [failed, setFailed] = useState<boolean>(false);

	useEffect(() => {
		let gameObj: Game;

		const onStart = (e: KeyboardEvent) => {
			const code = e.code;
			if (code) {
				gameObj?.start();
				window.removeEventListener("keydown", onStart);
			}
		};

		if (window) {
			if (canvasRef.current && document) {
				gameObj = new Game({
					element: canvasRef.current,
					onReady: (g: Game) => {
						window.addEventListener("keydown", onStart);
						setFailed(false);
					},
					onFailed: () => {
						window.removeEventListener("keydown", onStart);
						setFailed(true);
					},
					blocks: blocks404,
				});

				setGame(gameObj);
			}
		}
		return () => {
			window.removeEventListener("keydown", onStart);
			if (gameObj) {
				gameObj.destroy();
			}
		};
	}, []);

	const restart = () => {
		console.log(game);
		game?.reset();
	};

	return (
		<div>
			<canvas ref={canvasRef} className={styles.canvas} id='space-invaders' />

			<Footer
				actions={<>{failed && <button onClick={restart}>重新开始</button>}</>}
			></Footer>
		</div>
	);
};

Page404.getLayout = function getLayout(page: ReactElement) {
	return <BlankLayout>{page}</BlankLayout>;
};

export default Page404;
