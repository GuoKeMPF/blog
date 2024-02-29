import React, { useEffect, useRef, type FC } from "react";

import { DirectionalLight, Scene, WebGLRenderer, BoxGeometry, MeshPhongMaterial, Mesh, PerspectiveCamera } from "three";

interface ThreeObj {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  geometry: BoxGeometry;
  cube: Mesh;
}


export const Cube: FC = ({ }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeObject = useRef<ThreeObj>();

  const requestAnimationFrameId = useRef<number>(0);


  function animate() {
    if (threeObject.current) {

      const { camera, renderer, scene, cube } = threeObject.current;

      cube.rotation.x = (cube.rotation.x + 0.01) % Math.PI;
      cube.rotation.y = (cube.rotation.y + 0.01) % Math.PI;

      requestAnimationFrameId.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
  }

  useEffect(() => {
    if (containerRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const renderer = new WebGLRenderer({ antialias: true, canvas });

      const fov = 75;
      const aspect = 2; // the canvas default
      const near = 0.1;
      const far = 5;
      const camera = new PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 2;

      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);
      const material = new MeshPhongMaterial({ color: 0x44aa88 });
      const cube = new Mesh(geometry, material);

      const color = 0xFFFFFF;
      const intensity = 3;
      const light = new DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      const scene = new Scene();
      scene.add(light);
      scene.add(cube);
      renderer.render(scene, camera);
      threeObject.current = {
        camera,
        scene,
        renderer,
        geometry,
        cube,
      };
      animate();
    }

    return () => {
      if (requestAnimationFrameId.current) {
        cancelAnimationFrame(requestAnimationFrameId.current);
      }
    }
  })
  return <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "200px" }}>
    <canvas ref={canvasRef}></canvas>
  </div>;
};

export default Cube


