import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



interface ThreeObject {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  clock: THREE.Clock;
  mixer?: THREE.AnimationMixer;
}

function Load3DDragon() {
  const container = useRef<HTMLDivElement>(null);
  const threeObject = useRef<ThreeObject>();

  const requestAnimationFrameId = useRef<number>();

  const init = async () => {
    if (!container.current) {
      throw new Error('container.current is null');
    }
    if (!threeObject.current) {
      throw new Error('threeObject.current is null');
    }
    const loader = new GLTFLoader().setPath('/assets/threejs/');

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/assets/threejs/draco/javascript/');
    loader.setDRACOLoader(dracoLoader);


    const { camera, scene, renderer } = threeObject.current;


    camera.position.set(0, 3, 2)
    camera.lookAt(0, 2, 0)
    container.current.appendChild(renderer.domElement);



    const gltf = await loader.loadAsync('models/dragon/scene.gltf')
    console.log(gltf);



    const mixer = new THREE.AnimationMixer(gltf.scene);

    const action = mixer.clipAction(gltf.animations[6])
    action.play()
    threeObject.current.mixer = mixer;

    scene.add(gltf.scene)





    const controls = new OrbitControls(camera, container.current)
    controls.target.set(0, 0.75, 0)
    controls.enableDamping = true


    const hemiLight = new THREE.HemisphereLight('#ffffff');
    hemiLight.name = 'hemi_light';
    scene.add(hemiLight);

    const light1 = new THREE.AmbientLight('#ffffff');
    light1.name = 'ambient_light';
    camera.add(light1);

    const light2 = new THREE.DirectionalLight('#ffffff');
    light2.position.set(1, 0, 0); // ~60º
    light2.name = 'main_light';
    camera.add(light2);




    const { width, height } = container.current.getBoundingClientRect();
    renderer.setSize(width, height);
    renderer.setClearColor('#ffffff')
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
    renderer.render(scene, camera);



  };

  function animate() {
    if (threeObject.current) {
      const { camera, renderer, scene, clock, mixer } = threeObject.current;
      requestAnimationFrameId.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
      const delta = clock.getDelta();
      mixer?.update(delta)
    }
  }



  useEffect(() => {
    if (container.current) {
      const { width, height } = container.current.getBoundingClientRect();
      /**
       * PerspectiveCamera(fov, aspect, near, far)
       * fov: 相机可视锥简短角度，角度越小，，锥体越尖，可视看范围越小
       * aspect: 相机视锥体的长宽比，类似电影宽高比
       * near: 相机视锥体的近裁面
       * far: 相机视锥体的远裁面
       */
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
      const clock = new THREE.Clock();
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({
        alpha: true
      });
      threeObject.current = {
        camera,
        scene,
        renderer,
        clock,
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
        minHeight: '600px',
        minWidth: '400px',
      }}
    ></div>
  );
}

export default Load3DDragon;
