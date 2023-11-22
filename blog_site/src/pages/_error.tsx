/** @format */

import { useRef, useState, useEffect } from "react";
import type { ReactElement } from "react";

import Link from "next/link";
import { Game, blocks500 } from "@/utils/game";
import styles from "./error.module.scss";
import BlankLayout from "@/layouts/BlankLayout";
import { Footer } from "@/components/ErrorPages";
import { NextPageContext } from "next/types";

interface ErrorProps {
  statusCode: number
}

const ErrorPage = ({ statusCode }: ErrorProps) => {
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
          blocks: blocks500,
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
    game?.reset();
  };

  return (
    <div>
      <canvas ref={canvasRef} className={styles.canvas} id='space-invaders' />

      <Footer
        actions={<>{<button onClick={restart}>重新开始</button>}</>}
      ></Footer>
    </div>
  )
}

ErrorPage.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>;
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 500
  return { statusCode }
}

export default ErrorPage