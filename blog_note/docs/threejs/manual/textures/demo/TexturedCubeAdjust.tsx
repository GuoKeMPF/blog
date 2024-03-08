
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
  SRGBColorSpace,
  MathUtils,
  RepeatWrapping,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping
} from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import textureImg from './images/wall.jpg'



interface ThreeObj {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  geometry: BoxGeometry;
  cube: Mesh;
}

class DegRadHelper {
  obj: any;
  prop: any;
  constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
  }
  get value() {
    return MathUtils.radToDeg(this.obj[this.prop]);
  }
  set value(v) {
    this.obj[this.prop] = MathUtils.degToRad(v);
  }
}

class StringToNumberHelper {
  prop: any;
  obj: any;
  constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
  }
  get value() {
    return this.obj[this.prop];
  }
  set value(v) {
    this.obj[this.prop] = parseFloat(v);
  }
}










export const TexturedCubeAdjust: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
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




      const wrapModes = {
        'ClampToEdgeWrapping': ClampToEdgeWrapping,
        'RepeatWrapping': RepeatWrapping,
        'MirroredRepeatWrapping': MirroredRepeatWrapping,
      };

      function updateTexture() {
        texture.needsUpdate = true;
      }




      const gui = new GUI({
        container: uiRef.current
      });
      gui.add(new StringToNumberHelper(texture, 'wrapS'), 'value', wrapModes)
        .name('texture.wrapS')
        .onChange(updateTexture);
      gui.add(new StringToNumberHelper(texture, 'wrapT'), 'value', wrapModes)
        .name('texture.wrapT')
        .onChange(updateTexture);
      gui.add(texture.repeat, 'x', 0, 5, .01).name('texture.repeat.x');
      gui.add(texture.repeat, 'y', 0, 5, .01).name('texture.repeat.y');
      gui.add(texture.offset, 'x', - 2, 2, .01).name('texture.offset.x');
      gui.add(texture.offset, 'y', - 2, 2, .01).name('texture.offset.y');
      gui.add(texture.center, 'x', - .5, 1.5, .01).name('texture.center.x');
      gui.add(texture.center, 'y', - .5, 1.5, .01).name('texture.center.y');
      gui.add(new DegRadHelper(texture, 'rotation'), 'value', - 360, 360)
        .name('texture.rotation');

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
  return (<div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "400px", fontSize: 0, position: 'relative' }}>
    <div style={{ position: 'absolute' }} ref={uiRef}></div>
    <canvas style={{ display: 'block' }} ref={canvasRef}></canvas>
  </div>
  );
};
export default TexturedCubeAdjust
