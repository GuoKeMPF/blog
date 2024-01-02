import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';

import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

interface ThreeObject {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
}

function Load3D() {
  const container = useRef<HTMLDivElement>(null);
  const threeObject = useRef<ThreeObject>();

  const init = async () => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    const { camera, scene, renderer } = threeObject.current;
    loader.load(
      // resource URL
      '/assets/threejs/glft/Project.gltf',
      // called when the resource is loaded
      function (gltf) {
        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      // called when loading has errors
      function (error) {
        console.log('An error happened');
      },
    );
  };

  useEffect(() => {
    if (container.current) {
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        200,
      );
      const scene = new THREE.Scene();

      const renderer = new THREE.WebGLRenderer();

      threeObject.current = {
        camera,
        scene,
        renderer,
      };
      init();
      renderer.render(scene, camera);
    }
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

export default Load3D;
