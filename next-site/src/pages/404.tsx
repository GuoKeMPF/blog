import { useRef, useState, useEffect } from "react";

import type { FC } from "react";
import { Game, blocks404 } from "@/utils/game";
import styles from "./error.module.scss";

const Page404: FC = () => {
  const canvasRef = useRef(null);
  const [game, setGame] = useState<Game>()

  useEffect(() => {
    let game: Game;

    if (window) {
      if (canvasRef.current && document) {
        game = new Game({
          element: canvasRef.current,
          onReady: (g: Game) => {
            setGame(g)
          },
          blocks: blocks404,
        });
      }
    }

    return () => {
      if (game) {
        game.stop()
      }
    };
  }, []);
  return <canvas ref={canvasRef} className={styles.canvas} id='space-invaders' />;
};

export default Page404;
