import React, { Fragment, useEffect, useMemo, useRef } from 'react';

import {
  CSS2DObject,
  CSS2DRenderer,
} from 'three/addons/renderers/CSS2DRenderer.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import earth_atmos_2048 from './textures/earth_atmos_2048.jpg';
import earth_normal_2048 from './textures/earth_normal_2048.jpg';
import earth_specular_2048 from './textures/earth_specular_2048.jpg';
import moon_1024 from './textures/moon_1024.jpg';

interface ThreeObject {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  css2DRenderer: CSS2DRenderer;
  gui: GUI;
  clock: THREE.Clock;
  moon?: THREE.Mesh;
}

function CSS2d() {
  const container = useRef<HTMLDivElement>(null);

  const threeObject = useRef<ThreeObject>();
  const requestAnimationFrameId = useRef<number>()

  const EARTH_RADIUS = useMemo(() => 1, []);
  const MOON_RADIUS = useMemo(() => 0.27, []);

  function initGui() {
    const { gui, camera } = threeObject.current;
    const layers = {
      'Toggle Name': function () {
        camera.layers.toggle(0);
      },
      'Toggle Mass': function () {
        camera.layers.toggle(1);
      },
      'Enable All': function () {
        camera.layers.enableAll();
      },
      'Disable All': function () {
        camera.layers.disableAll();
      },
    };
    gui.title('Camera Layers');
    gui.add(layers, 'Toggle Name');
    gui.add(layers, 'Toggle Mass');
    gui.add(layers, 'Enable All');
    gui.add(layers, 'Disable All');
    gui.open();
  }

  function init() {
    if (threeObject.current) {
      const { camera, renderer, scene, css2DRenderer } = threeObject.current;
      const { width, height } = container.current.getBoundingClientRect();

      camera.position.set(10, 5, 20);
      camera.layers.enableAll();

      const dirLight = new THREE.DirectionalLight(0xffffff, 3);
      dirLight.position.set(0, 0, 1);
      dirLight.layers.enableAll();
      scene.add(dirLight);

      const axesHelper = new THREE.AxesHelper(5);
      axesHelper.layers.enableAll();
      scene.add(axesHelper);

      const textureLoader = new THREE.TextureLoader();
      const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 16, 16);
      const earthMaterial = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 5,
        map: textureLoader.load(earth_atmos_2048),
        specularMap: textureLoader.load(earth_specular_2048),
        normalMap: textureLoader.load(earth_normal_2048),
        normalScale: new THREE.Vector2(0.85, 0.85),
      });
      earthMaterial.map.colorSpace = THREE.SRGBColorSpace;
      const earth = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earth);

      const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 16);
      const moonMaterial = new THREE.MeshPhongMaterial({
        shininess: 5,
        map: textureLoader.load(moon_1024),
      });
      moonMaterial.map.colorSpace = THREE.SRGBColorSpace;
      const moon = new THREE.Mesh(moonGeometry, moonMaterial);
      scene.add(moon);

      earth.layers.enableAll();
      moon.layers.enableAll();

      const earthDiv = document.createElement('div');
      earthDiv.className = 'label';
      earthDiv.textContent = 'Earth';
      earthDiv.style.backgroundColor = 'transparent';

      const earthLabel = new CSS2DObject(earthDiv);
      earthLabel.position.set(1.5 * EARTH_RADIUS, 0, 0);
      earthLabel.center.set(0, 1);
      earth.add(earthLabel);
      earthLabel.layers.set(0);

      const earthMassDiv = document.createElement('div');
      earthMassDiv.className = 'label';
      earthMassDiv.textContent = '5.97237e24 kg';
      earthMassDiv.style.backgroundColor = 'transparent';

      const earthMassLabel = new CSS2DObject(earthMassDiv);
      earthMassLabel.position.set(1.5 * EARTH_RADIUS, 0, 0);
      earthMassLabel.center.set(0, 0);
      earth.add(earthMassLabel);
      earthMassLabel.layers.set(1);

      const moonDiv = document.createElement('div');
      moonDiv.className = 'label';
      moonDiv.textContent = 'Moon';
      moonDiv.style.backgroundColor = 'transparent';

      const moonLabel = new CSS2DObject(moonDiv);
      moonLabel.position.set(1.5 * MOON_RADIUS, 0, 0);
      moonLabel.center.set(0, 1);
      moon.add(moonLabel);
      moonLabel.layers.set(0);

      const moonMassDiv = document.createElement('div');
      moonMassDiv.className = 'label';
      moonMassDiv.textContent = '7.342e22 kg';
      moonMassDiv.style.backgroundColor = 'transparent';

      const moonMassLabel = new CSS2DObject(moonMassDiv);
      moonMassLabel.position.set(1.5 * MOON_RADIUS, 0, 0);
      moonMassLabel.center.set(0, 0);
      moon.add(moonMassLabel);
      moonMassLabel.layers.set(1);

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      container.current.appendChild(renderer.domElement);

      css2DRenderer.setSize(width, height);
      css2DRenderer.domElement.style.position = 'absolute';
      css2DRenderer.domElement.style.top = '0px';
      container.current.appendChild(css2DRenderer.domElement);

      const controls = new OrbitControls(camera, css2DRenderer.domElement);
      controls.minDistance = 5;
      controls.maxDistance = 100;

      threeObject.current.moon = moon
    }
  }

  function onWindowResize() {
    if (threeObject.current) {
      const { camera, renderer, css2DRenderer } = threeObject.current;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      css2DRenderer.setSize(window.innerWidth, window.innerHeight);
    }
  }


  function animate() {

    if (threeObject.current) {
      const { camera, renderer, css2DRenderer, clock, scene, moon } = threeObject.current;
      requestAnimationFrameId.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      moon?.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5);
      renderer.render(scene, camera);
      css2DRenderer.render(scene, camera);
    }

  }

  useEffect(() => {
    if (container.current) {
      const gui = new GUI(
        { container: container.current, injectStyles: true }
      );
      const clock = new THREE.Clock();
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        200,
      );
      const scene = new THREE.Scene();

      const renderer = new THREE.WebGLRenderer();
      const css2DRenderer = new CSS2DRenderer();

      threeObject.current = {
        gui,
        clock,
        camera,
        scene,
        renderer,
        css2DRenderer,
      };
      init();
      initGui();
      renderer.render(scene, camera);

      animate();

      window.addEventListener('resize', onWindowResize);
    }
    return () => {
      cancelAnimationFrame(requestAnimationFrameId.current)
      window.removeEventListener('resize', onWindowResize);
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
        // position: 'relative'
      }}
    ></div>
  );
}

export default CSS2d;
