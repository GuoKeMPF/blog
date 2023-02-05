import { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';
import gameOfLife from './gameOfLife';

interface GameOfLifeProp {
  mapConfig: {
    xAxis: number;
    yAxis: number;
    width: number;
    height: number;
  };
  initValues: Array<{
    x: number;
    y: number;
  }>;
}

const GameOfLife: FC = () => {
  const intervalId = useRef<number>(0);
  const canvas = useRef<HTMLCanvasElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [mapConfig, setMapConfig] = useState<GameOfLifeProp['mapConfig']>({
    xAxis: 30,
    yAxis: 20,
    width: 0,
    height: 0,
  });

  const [initValues, setInitValues] = useState<GameOfLifeProp['initValues']>([
    {
      x: 4,
      y: 1,
    },
    {
      x: 4,
      y: 2,
    },
    {
      x: 4,
      y: 3,
    },
  ]);

  const generationNext = gameOfLife(mapConfig, initValues);

  const [cell, setCell] = useState<number>(0);

  useEffect(() => {
    if (container.current && canvas.current) {
      const size = container.current.getBoundingClientRect();
      const { width: w } = size;
      const c = Math.floor(w / mapConfig.xAxis);
      const height = c * mapConfig.yAxis;
      const width = c * mapConfig.xAxis;
      canvas.current.width = width + 1;
      canvas.current.height = height + 1;
      setMapConfig({
        ...mapConfig,
        width,
        height,
      });
      setCell(c);
    }
  }, []);

  const drawMap = () => {
    const { current } = canvas;
    const ctx = current?.getContext('2d');
    if (ctx) {
      /**
       * bg
       */
      ctx.fillStyle = '#ffff';
      ctx.fillRect(0, 0, mapConfig.width, mapConfig.height);
      /**
       * line
       */
      for (let r = 0; r <= mapConfig.xAxis; r += 1) {
        ctx.moveTo(0, cell * r);
        ctx.lineTo(mapConfig.width, cell * r);
      }
      for (let c = 0; c <= mapConfig.xAxis; c += 1) {
        ctx.moveTo(cell * c, 0);
        ctx.lineTo(cell * c, mapConfig.height);
      }
      ctx.strokeStyle = "#0f000"
      ctx.stroke();
      /**
       * cell
       */
      initValues.forEach((i) => {
        const { x, y } = i;

        ctx.fillStyle = '#000';
        ctx.fillRect(x * cell, y * cell, cell, cell);
      });
    }
  };

  useEffect(() => {
    drawMap();
  }, [cell, drawMap, initValues]);

  useEffect(() => {
    const id = window.setInterval(() => {
      const nextValues = generationNext();
      setInitValues(nextValues);
    }, 1000);
    intervalId.current = id;
  }, []);

  return (
    <div ref={container}>
      <canvas ref={canvas}></canvas>
    </div>
  );
};

export default GameOfLife;
