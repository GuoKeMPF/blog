
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


const TextureDome = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      const { width, height } = container.current.getBoundingClientRect();
      const scene = new THREE.Scene();

      scene.background = new THREE.Color(0x000000);
      scene.fog = new THREE.Fog(0x000000, 250, 1400);

      const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
      dirLight.position.set(0, 0, 1).normalize();

      const pointLight = new THREE.PointLight(0xffffff, 4.5, 0, 0);
      pointLight.color.setHSL(Math.random(), 1, 0.5);
      pointLight.position.set(0, 100, 90);

      scene.add(dirLight, pointLight);




      const camera = new THREE.PerspectiveCamera(30, width / height, 1, 1000);
      camera.position.set(0, 100, 400);

      // 相机朝向
      camera.lookAt(new THREE.Vector3(100, 0, 0));
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      container.current.appendChild(renderer.domElement);
      const loader = new FontLoader();
      loader.load("/assets/threejs/font/typeface.json", function (font) {
        const textGeometry = new TextGeometry('Hello Word',
          {
            font: font,
            size: 50, // 表示文本大小，即字体高度，默认为 100
            height: 20, // 表示文本厚度，默认为 50
            curveSegments: 12, // 表示圆角段数，默认为 12
            bevelEnabled: true,// 表示是否启用斜角，默认为 false
            bevelThickness: 0.01, // 表示斜角的深度，默认为 10
            bevelSize: 0.01, // 表示斜角的高度，默认为 8
            bevelOffset: 0, // 表示斜角相对于文本的偏移量，默认为 0
            bevelSegments: 1 // 表示斜角的段数，默认为 3
          });

        const textMaterial = [
          new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
          new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
        ]
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text);

        renderer.render(scene, camera);
      });
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
};

export default TextureDome;
