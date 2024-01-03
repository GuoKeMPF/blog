import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';

// import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'


interface ThreeObject {
	camera: THREE.PerspectiveCamera;
	scene: THREE.Scene;
	renderer: THREE.WebGLRenderer;
}

function Load3D() {
	const container = useRef<HTMLDivElement>(null);
	const threeObject = useRef<ThreeObject>();

	const init = async () => {
		const loader = new GLTFLoader().setPath('/assets/threejs/glft/');

		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('/assets/threejs/draco/javascript/');
		loader.setDRACOLoader(dracoLoader);
		const { camera, scene, renderer } = threeObject.current;

		const { width, height } = container.current.getBoundingClientRect();
		renderer.setSize(width, height);
		container.current.appendChild(renderer.domElement);
		const gltf = await loader.loadAsync('Project.gltf')

		scene.add(gltf.scene);
		console.log(gltf);


		renderer.render(scene, camera);
	};

	useEffect(() => {
		if (container.current) {
			const { width, height } = container.current.getBoundingClientRect();
			const camera = new THREE.PerspectiveCamera(
				45,
				width / height,
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

		}
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

export default Load3D;
