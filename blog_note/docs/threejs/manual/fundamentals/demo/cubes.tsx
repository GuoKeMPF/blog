import React, { useEffect, useRef, type FC } from 'react';

import {
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

interface ThreeObj {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  geometry: BoxGeometry;
  cubes: Mesh[];
}

export const Cubes: FC = ({}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeObject = useRef<ThreeObj>();

  const requestAnimationFrameId = useRef<number>(0);

  function makeInstance(scene, geometry, color, x) {
    const material = new MeshPhongMaterial({ color });

    const cube = new Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  function animate() {
    if (threeObject.current) {
      const { camera, renderer, scene, cubes } = threeObject.current;

      cubes.forEach((cube) => {
        cube.rotation.x = (cube.rotation.x + 0.01) % Math.PI;
        cube.rotation.y = (cube.rotation.x + 0.01) % Math.PI;
      });

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

      const color = 0xffffff;
      const intensity = 3;
      const light = new DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      const scene = new Scene();
      scene.add(light);

      const cubes = [
        makeInstance(scene, geometry, 0x44aa88, 0),
        makeInstance(scene, geometry, 0x8844aa, -2),
        makeInstance(scene, geometry, 0xaa8844, 2),
      ];

      renderer.render(scene, camera);
      threeObject.current = {
        camera,
        scene,
        renderer,
        geometry,
        cubes,
      };
      animate();
    }

    return () => {
      if (requestAnimationFrameId.current) {
        cancelAnimationFrame(requestAnimationFrameId.current);
      }
    };
  });
  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', minHeight: '200px' }}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Cubes;
