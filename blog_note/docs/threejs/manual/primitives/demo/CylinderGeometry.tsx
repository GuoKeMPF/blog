import React, { FC, useEffect, useRef, useState } from 'react';
import { Color, PerspectiveCamera, Scene, WebGLRenderer, DirectionalLight, CylinderGeometry, WireframeGeometry, LineBasicMaterial, Group, MeshPhongMaterial, DoubleSide, LineSegments, Mesh, } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { FormUnit, FormUnitType } from "../component"


type Params = {
  radiusTop: number;
  radiusBottom: number;
  height: number;
  thetaStart: number;
  thetaLength: number;
  radialSegments: number;
  heightSegments: number;
  openEnded: boolean;
}

const formConfig: FormUnitType[] = [
  {
    label: 'radiusTop',
    defaultValue: 8,
    max: 30,
    min: 1,
    type: 'number',
  },
  {
    label: 'radiusBottom',
    defaultValue: 8,
    max: 30,
    min: 1,
    type: 'number',
  },
  {
    label: 'height',
    defaultValue: 8,
    max: 30,
    min: 1,
    type: 'number',
  },
  {
    label: 'radialSegments',
    defaultValue: 8,
    max: 30,
    min: 1,
    type: 'number',
  },
  {
    label: 'heightSegments',
    defaultValue: 8,
    max: 30,
    min: 1,
    type: 'number',
  },
  {
    label: 'openEnded',
    defaultValue: true,
    type: 'boolean',
  },
  {
    label: 'thetaStart',
    defaultValue: 0,
    max: Math.PI * 2.00,
    min: 0,
    type: 'number',
  },
  {
    label: 'thetaLength',
    defaultValue: Math.PI * 2.00,
    max: Math.PI * 2.00,
    min: 0,
    type: 'number',
  },
]

const defaultValues: Params = formConfig.reduce((acc, cur) => {
  acc[cur.label] = cur?.defaultValue ?? 0;
  return acc;
}, {} as Params)

type ConeGeometryDemoProps = {

};

export const CylinderGeometryDemo: FC<ConeGeometryDemoProps> = ({ }) => {

  const container = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Params>(defaultValues);
  const groupRef = useRef<Group>(null);

  const createGeometry = () => {
    const { radiusTop, radiusBottom, height,
      radialSegments, heightSegments,
      openEnded,
      thetaStart, thetaLength } = data
    const geometry = new CylinderGeometry(radiusTop, radiusBottom, height,
      radialSegments, heightSegments,
      openEnded,
      thetaStart, thetaLength)
    return geometry
  }

  useEffect(() => {
    if (groupRef.current) {
      const geometry = createGeometry()
      groupRef.current.children.forEach((child) => {
        child.geometry.dispose();
      })
      groupRef.current.children[0].geometry = new WireframeGeometry(geometry);
      groupRef.current.children[1].geometry = geometry;
    }

  }, [data])


  useEffect(() => {
    let animationId = 0;
    if (container.current) {
      const { width, height } = container.current.getBoundingClientRect();
      // 创建场景
      const scene = new Scene();

      scene.background = new Color(0x444444);
      const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 30;
      const renderer = new WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      container.current.appendChild(renderer.domElement);
      const controls = new OrbitControls(camera, container.current)
      controls.target.set(0, 0.75, 0)
      controls.enableDamping = true



      const lights: DirectionalLight[] = [];
      lights[0] = new DirectionalLight(0xffffff, 3);
      lights[1] = new DirectionalLight(0xffffff, 3);
      lights[2] = new DirectionalLight(0xffffff, 3);

      lights[0].position.set(0, 50, 0);
      lights[1].position.set(25, 50, 25);
      lights[2].position.set(- 25, - 50, - 25);

      scene.add(lights[0]);
      scene.add(lights[1]);
      scene.add(lights[2]);

      const geometry = createGeometry()
      const group = new Group();
      const lineMaterial = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
      const meshMaterial = new MeshPhongMaterial({ color: 0x156289, emissive: 0x072534, side: DoubleSide, flatShading: true });

      group.add(new LineSegments(geometry, lineMaterial));
      group.add(new Mesh(geometry, meshMaterial));
      groupRef.current = group;

      scene.add(group);
      function animate() {
        // 设置旋转角度
        group.rotation.x += 0.01;
        group.rotation.y += 0.01;
        group.rotation.z += 0.01;
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



  return (<div>
    <div
      ref={container}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '400px',
        minWidth: '400px',
      }}
    ></div>
    <FormUnit onFormChange={setData} configs={formConfig} />
  </div>
  );
};


export default CylinderGeometryDemo;
