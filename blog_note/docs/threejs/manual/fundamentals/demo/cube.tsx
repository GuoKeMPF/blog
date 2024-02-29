import React, { useEffect, useRef, type FC } from "react";

import { Scene, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera } from "three";

export const Cube: FC = ({ }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (containerRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const renderer = new WebGLRenderer({ antialias: true, canvas });
      const camera = new PerspectiveCamera(75, 2, 0.1, 5);
      camera.position.z = 2;
      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);
      const material = new MeshBasicMaterial({ color: 0x44aa88 });
      const cube = new Mesh(geometry, material);
      const scene = new Scene();
      scene.add(cube);
      renderer.render(scene, camera);
    }
  })
  return <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "200px" }}>
    <canvas ref={canvasRef}></canvas>
  </div>;
};

export default Cube


