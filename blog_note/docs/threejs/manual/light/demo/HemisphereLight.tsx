
import React, { useEffect, useRef, type FC } from 'react';

import {
  BoxGeometry,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  TextureLoader,
  SRGBColorSpace,
  PlaneGeometry,
  DoubleSide,
  SphereGeometry,
  Color,
  NearestFilter,
  RepeatWrapping,
  HemisphereLight
} from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import textureImg from './images/checker.png'


class ColorGUIHelper {
  object: any;
  prop: any;
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}



interface ThreeObj {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
}

export const LightHemisphere: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const threeObject = useRef<ThreeObj>();

  const requestAnimationFrameId = useRef<number>(0);

  function animate() {
    if (threeObject.current) {
      const { camera, renderer, scene } = threeObject.current;

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

      const fov = 45;
      const aspect = 2; // the canvas default
      const near = 0.1;
      const far = 100;
      const camera = new PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 10, 20);


      const controls = new OrbitControls(camera, canvas);
      controls.target.set(0, 5, 0);
      controls.update();

      const scene = new Scene();
      scene.background = new Color('black')



      // 地板
      {
        const loader = new TextureLoader();
        const texture = loader.load(textureImg);
        const planeSize = 40;
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.magFilter = NearestFilter;
        texture.colorSpace = SRGBColorSpace;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new PlaneGeometry(planeSize, planeSize);
        const planeMat = new MeshPhongMaterial({
          map: texture,
          side: DoubleSide,
        });
        const mesh = new Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * - .5;
        scene.add(mesh);
      }

      // 立方体
      {
        const cubeSize = 4;
        const cubeGeo = new BoxGeometry(cubeSize, cubeSize, cubeSize);
        const cubeMat = new MeshPhongMaterial({ color: '#8AC' });
        const mesh = new Mesh(cubeGeo, cubeMat);
        mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
        scene.add(mesh);
      }

      //  球体
      {
        const sphereRadius = 3;
        const sphereWidthDivisions = 32;
        const sphereHeightDivisions = 16;
        const sphereGeo = new SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
        const sphereMat = new MeshPhongMaterial({ color: '#CA8' });
        const mesh = new Mesh(sphereGeo, sphereMat);
        mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
        scene.add(mesh);
      }

      // color
      {
        const skyColor = 0xB1E1FF;  // light blue
        const groundColor = 0xB97A20;  // brownish orange
        const intensity = 1;
        const light = new HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
        const gui = new GUI({
          container: uiRef.current
        });
        gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('skyColor');
        gui.addColor(new ColorGUIHelper(light, 'groundColor'), 'value').name('groundColor');
        gui.add(light, 'intensity', 0, 20, 0.01);
      }


      renderer.render(scene, camera);

      threeObject.current = { camera, renderer, scene }
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
export default LightHemisphere


