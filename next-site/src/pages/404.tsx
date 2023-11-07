import { useRef, useState, useEffect } from "react";
import type { ReactElement } from "react";

import Link from "next/link";

import { Game, blocks404 } from "@/utils/game";
import styles from "./error.module.scss";
import BaseLayout from "@/layouts/BaseLayout";
import { NextPageWithLayout } from "./_app";

const Page404: NextPageWithLayout = () => {
  const canvasRef = useRef(null);
  const [game, setGame] = useState<Game>()
  const [failed, setFailed] = useState<boolean>(false)


  useEffect(() => {
    let gameObj: Game;


    const onStart = (e: KeyboardEvent) => {
      e.preventDefault();
      const code = e.code
      if (code) {
        gameObj?.start()
        window.removeEventListener("keydown", onStart);
      }
    }

    if (window) {
      if (canvasRef.current && document) {
        gameObj = new Game({
          element: canvasRef.current,
          onReady: (g: Game) => {
            setGame(g)
            window.addEventListener("keydown", onStart);
          },
          blocks: blocks404,
        });
      }
    }
    return () => {
      window.removeEventListener("keydown", onStart);
      if (gameObj) {
        gameObj.destroy()
      }
    };
  }, []);

  return <>
    <canvas ref={canvasRef} className={styles.canvas} id='space-invaders' />
    <div className="footer">
      <Link href={'/'} >
        
      </Link>
    </div>
  </>;
};

Page404.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};


export default Page404;
