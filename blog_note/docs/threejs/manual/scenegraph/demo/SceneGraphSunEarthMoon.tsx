import React, { useEffect, useRef, type FC } from "react";
import { Scene, PerspectiveCamera, WebGLRenderer, PointLight, MeshPhongMaterial, Mesh, SphereGeometry, Object3D } from "three";



interface ThreeObject {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  objects: (Mesh | Object3D)[];
}



export const SceneGraphSunEarthMoon: FC = () => {

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const threeObject = useRef<ThreeObject>();
  const requestAnimationFrameId = useRef<number>();

  function resizeRendererToDisplaySize() {
    const { camera, renderer } = threeObject.current!;
    const canvas = canvasRef.current
    if (!canvas || !containerRef.current) {
      return
    };
    const { width: canvasW, height: canvasH } = canvas.getBoundingClientRect();
    const [w, h] = [Math.floor(canvasW), Math.floor(canvasH)]
    const container = containerRef.current!;
    const { width, height } = container.getBoundingClientRect();
    const [cw, ch] = [Math.floor(width), Math.floor(height)];
    const needResize = (w !== cw) || (h !== ch);
    if (needResize) {
      const canvas = renderer.domElement;
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height, false);
      canvas.width = cw;
      canvas.height = ch;
      camera.aspect = cw / ch;
      camera.updateProjectionMatrix();
    }
  }

  function animate(time) {
    if (threeObject.current) {
      const { camera, renderer, scene, objects } = threeObject.current;

      resizeRendererToDisplaySize();
      objects.forEach((obj) => {
        obj.rotation.y = time * 0.001;
      });

      renderer.render(scene, camera);
      requestAnimationFrameId.current = requestAnimationFrame(animate);
    }
  }




  const init = () => {
    const { camera, scene, objects = [] } = threeObject.current!;
    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    {
      const color = 0xFFFFFF;
      const intensity = 500;
      const light = new PointLight(color, intensity);
      scene.add(light);
    }

    const radius = 1;
    const widthSegments = 6;
    const heightSegments = 6;
    const sphereGeometry = new SphereGeometry(
      radius, widthSegments, heightSegments);

    const solarSystem = new Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);


    // 太阳
    const sunMaterial = new MeshPhongMaterial({ emissive: 0xFFFF00 });
    const sunMesh = new Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5); // 设置太阳大小
    solarSystem.add(sunMesh);

    // 地球

    const earthOrbit = new Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    const earthMaterial = new MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
    });
    const earthMesh = new Mesh(sphereGeometry, earthMaterial);
    earthOrbit.add(earthMesh);
    objects.push(...[sunMesh, earthMesh]);
    requestAnimationFrameId.current = requestAnimationFrame(animate);


    const moonOrbit = new Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);

    const moonMaterial = new MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
    const moonMesh = new Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(.5, .5, .5);
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);


  }


  useEffect(() => {

    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const fov = 40;
      const aspect = width / height; // the canvas default
      const near = 0.1;
      const far = 1000;
      const camera = new PerspectiveCamera(
        fov, aspect, near, far
      );
      const scene = new Scene();
      const canvas = canvasRef.current!;
      canvas.width = width;
      canvas.height = height;
      const renderer = new WebGLRenderer({ antialias: true, canvas });
      threeObject.current = {
        camera,
        scene,
        renderer,
        objects: []
      };
      init();
    } else {
      throw new Error("containerRef.current is null");
    }
    return () => {
      if (requestAnimationFrameId.current) {
        cancelAnimationFrame(requestAnimationFrameId.current);
      }
    }
  }, [])

  // 行内块元素（inline-block elements）会在默认情况下保留元素间的空白间隙，这可能会导致父元素略微被撑开一点。这是由于行内块元素默认具有基线对齐的特性。
  // 设置父元素的font-size: 0;： 将父元素的字体大小设置为0，这样子元素之间的空白间隙就不会显示出来了。
  return <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "400px", fontSize: 0 }}>
    <canvas style={{ display: 'block' }} ref={canvasRef}></canvas>
  </div>;
};


export default SceneGraphSunEarthMoon
