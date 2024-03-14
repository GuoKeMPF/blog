
import React, { useEffect, useRef, type FC } from 'react';

import {
  BoxGeometry,
  DirectionalLight,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  TextureLoader,
  SRGBColorSpace,
  MeshBasicMaterial
} from 'three';

import textureImg1 from './images/flower-1.jpg'
import textureImg2 from './images/flower-2.jpg'
import textureImg3 from './images/flower-3.jpg'
import textureImg4 from './images/flower-4.jpg'
import textureImg5 from './images/flower-5.jpg'
import textureImg6 from './images/flower-6.jpg'



interface ThreeObj {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  geometry: BoxGeometry;
  cube: Mesh;
}


export const TexturedCube6Textures: FC = ({ }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeObject = useRef<ThreeObj>();

  const requestAnimationFrameId = useRef<number>(0);

  function animate(t) {
    if (threeObject.current) {
      const { camera, renderer, scene, cube } = threeObject.current;

      const speed = .2;
      const rot = t * 0.001 * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;


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

  function loadColorTexture(path) {
    const loader = new TextureLoader();
    const texture = loader.load(path);
    texture.colorSpace = SRGBColorSpace;
    return texture;
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


      const materials = [
        new MeshBasicMaterial({ map: loadColorTexture(textureImg1) }),
        new MeshBasicMaterial({ map: loadColorTexture(textureImg2) }),
        new MeshBasicMaterial({ map: loadColorTexture(textureImg3) }),
        new MeshBasicMaterial({ map: loadColorTexture(textureImg4) }),
        new MeshBasicMaterial({ map: loadColorTexture(textureImg5) }),
        new MeshBasicMaterial({ map: loadColorTexture(textureImg6) }),
      ];

      const cube = new Mesh(geometry, materials);
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

export default TexturedCube6Textures


