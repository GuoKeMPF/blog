# 画线

假设你将要画一个圆或者画一条线，而不是一个线框模型，或者说不是一个Mesh（网格）。 第一步我们要做的，是设置好renderer（渲染器）、scene（场景）和camera（相机）。

```js | pure
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );
const scene = new THREE.Scene();
```


接下来我们要做的事情是定义一个材质。对于线条来说，我们能使用的材质只有LineBasicMaterial 或者 LineDashedMaterial。

```js | pure
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
```

定义好材质之后，我们需要一个带有一些顶点的geometry（几何体）。

```js | pure

const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );
```

注意，线是画在每一对连续的顶点之间的，而不是在第一个顶点和最后一个顶点之间绘制线条（线条并未闭合）。

既然我们已经有了能够画两条线的点和一个材质，那我们现在就可以将他们组合在一起，形成一条线。

```js
const line = new THREE.Line( geometry, material );
```


剩下的事情就是把它添加到场景中，并调用render（渲染）函数。

```js | pure
scene.add( line );
renderer.render( scene, camera );
```
<code src="./index.tsx"></code>
