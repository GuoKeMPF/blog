
import React, { useEffect, useRef, type FC } from 'react';

import {
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  TextureLoader,
  SRGBColorSpace
} from 'three';

import textureImg from './images/wall.jpg'



interface ThreeObj {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  geometry: BoxGeometry;
  cube: Mesh;
}



export const TexturedCube: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeObject = useRef<ThreeObj>();

  const requestAnimationFrameId = useRef<number>(0);

  function animate() {
    if (threeObject.current) {
      const { camera, renderer, scene, cube } = threeObject.current;

      cube.rotation.x = (cube.rotation.x + 0.01) % Math.PI;
      cube.rotation.y = (cube.rotation.x + 0.01) % Math.PI;


      const canvas = canvasRef.current;
      const width = containerRef.current?.clientWidth || 0;
      const height = containerRef.current?.clientHeight || 0;
      const needResize = canvas?.width !== width || canvas?.height !== height;
      if (needResize) {
        // 设置相机宽高比
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        // 设置渲染器宽高
        renderer.setSize(width, height, false);
      }

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

      const loader = new TextureLoader();
      const texture = loader.load(textureImg);
      texture.colorSpace = SRGBColorSpace;

      const material = new MeshPhongMaterial({ map: texture });
      const cube = new Mesh(geometry, material);
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
    };
  });
  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', minHeight: '200px' }}
    >
      <canvas style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }} ref={canvasRef}></canvas>
    </div>
  );
};

export default TexturedCube
