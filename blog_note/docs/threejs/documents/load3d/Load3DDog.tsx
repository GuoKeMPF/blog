import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



interface ThreeObject {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
}

function Load3DDog() {
  const container = useRef<HTMLDivElement>(null);
  const threeObject = useRef<ThreeObject>();

  const requestAnimationFrameId = useRef<number>();

  const init = async () => {
    const loader = new GLTFLoader().setPath('/assets/threejs/');

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/assets/threejs/draco/javascript/');
    loader.setDRACOLoader(dracoLoader);
    const { camera, scene, renderer } = threeObject.current;

    const { width, height } = container.current.getBoundingClientRect();
    renderer.setSize(width, height);

    camera.position.set(2, 2, 2)
    container.current.appendChild(renderer.domElement);

    const gltf = await loader.loadAsync('models/shiba/scene.gltf')




    scene.add(gltf.scene);



    const controls = new OrbitControls(camera, container.current)
    controls.target.set(0, 0.75, 0)
    controls.enableDamping = true



    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


    renderer.render(scene, camera);
  };

  function animate() {
    if (threeObject.current) {
      const { camera, renderer, scene, } = threeObject.current;
      requestAnimationFrameId.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
  }



  useEffect(() => {
    if (container.current) {
      const { width, height } = container.current.getBoundingClientRect();

      const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        100,
      );
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer();
      threeObject.current = {
        camera,
        scene,
        renderer,
      };
      init();

      animate();
    }
    return () => {
      if (requestAnimationFrameId.current) {
        cancelAnimationFrame(requestAnimationFrameId.current);
      }
    };
  }, []);

  return (
    <div
      ref={container}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '400px',
        minWidth: '400px',
      }}
    ></div>
  );
}

export default Load3DDog;
