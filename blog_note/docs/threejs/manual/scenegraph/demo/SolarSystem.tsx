import React, { useEffect, useRef, type FC } from "react";


export const SolarSystem: FC = () => {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "200px" }}>
    <canvas ref={canvasRef}></canvas>
  </div>;
};


export default SolarSystem
