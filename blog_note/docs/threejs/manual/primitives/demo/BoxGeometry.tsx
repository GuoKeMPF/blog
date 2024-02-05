import React, { useEffect, useRef } from 'react';
import { Color, PerspectiveCamera, Scene, WebGLRenderer, DirectionalLight, BoxGeometry, LineBasicMaterial, Group, MeshPhongMaterial, DoubleSide, LineSegments, Mesh, } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const BoxGeometryDemo = () => {
  const container = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Scene>()


  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  useEffect(() => {
    let animationId = 0;
    if (container.current) {
      const { width, height } = container.current.getBoundingClientRect();
      // 创建场景
      const scene = new Scene();

      scene.background = new Color(0x444444);
      sceneRef.current = scene
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

      const geometry = new BoxGeometry(15, 15, 15);
      const group = new Group();
      const lineMaterial = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
      const meshMaterial = new MeshPhongMaterial({ color: 0x156289, emissive: 0x072534, side: DoubleSide, flatShading: true });

      group.add(new LineSegments(geometry, lineMaterial));
      group.add(new Mesh(geometry, meshMaterial));


      scene.add(group);

      // 该函数创建一个三维物体，将其放置在场景中，并使用给定的几何形状和材质对其进行渲染。
      // const cube = new Mesh(geometry, material);
      // scene.add(cube);
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


    <Form
      name="validate_other"
      {...formItemLayout}
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
        'color-picker': null,
      }}
      style={{ maxWidth: 600 }}
    >

      <Form.Item name="slider" label="Slider">
        <Slider />
      </Form.Item>
    </Form>
  </div>
  );
};

export default BoxGeometryDemo;
