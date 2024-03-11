import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDemo = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId = 0;
    if (container.current) {
      const { width, height } = container.current.getBoundingClientRect();
      // 创建场景
      const scene = new THREE.Scene();
      // 创建摄像头
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      // 创建渲染器
      const renderer = new THREE.WebGLRenderer();
      // 设置渲染器尺寸
      renderer.setSize(width, height);
      // 将渲染器添加到页面
      container.current.appendChild(renderer.domElement);
      // 创建一个几何物体
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      // 设置集合物体表面材质
      const material = new THREE.MeshBasicMaterial({ color: 0x8f0000 });

      // 该函数创建一个三维物体，将其放置在场景中，并使用给定的几何形状和材质对其进行渲染。
      const cube = new THREE.Mesh(geometry, material);
      // 设置相相对相机 z 位置 数值越大，相机越远
      camera.position.z = 2;
      scene.add(cube);
      function animate() {
        // 设置旋转角度
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.01;
        // 更新动画
        renderer.render(scene, camera);
        // 渲染下一帧
        animationId = requestAnimationFrame(animate);
      }
      // 开始绘制
      animate();
    }
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
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
};

export default ThreeDemo;
