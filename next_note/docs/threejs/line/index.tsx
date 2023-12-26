import { usePrefersColor } from 'dumi';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'

type ThreeObject = {
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
}

const ThreeDemo = () => {
  const container = useRef<HTMLDivElement>(null);


  const [, theme] = usePrefersColor();
  const threeObject = useRef<ThreeObject>()
  useEffect(() => {
    if (container.current) {
      const { width, height } = container.current.getBoundingClientRect();
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      // 相机位置 0 0 100
      camera.position.set(0, 0, 100);
      // 相机朝向
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      container.current.appendChild(renderer.domElement);
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
      const points: THREE.Vector3[] = [];
      points.push(new THREE.Vector3(-10, 0, 0));
      points.push(new THREE.Vector3(0, 10, 0));
      points.push(new THREE.Vector3(10, 0, 0));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      renderer.render(scene, camera);
      threeObject.current = { scene, renderer, camera };
    }
  }, []);


  useEffect(function () {
    if (threeObject.current) {
      const { scene, renderer, camera } = threeObject.current;
      const background = new THREE.Color(theme === 'dark' ? 0x00000 : 0xffffff)
      scene.background = background;
      // 不能使用解构将 render 解构出来，会有 this 指向问题报错
      renderer.render(scene, camera)
    }
  }, [theme])


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

export default ThreeDemo;
