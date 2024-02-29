---
title: 场景图
toc: menu
order: 5
---


# 场景图


Three.js 的核心可以说是它的场景图（scene graph）。场景图在 3D 引擎是一个图中节点的层次结构，其中每个节点代表了一个局部空间（local space）。

![Three.js 场景图](./images/scenegraph-generic.svg 'Three.js 场景图')


比如这样一个例子：太阳系、太阳、地球、月亮。

![Three.js 场景图](./images/scenegraph-solarsystem.svg 'Three.js 场景图')


<code src="./demo/SolarSystem.tsx"></code>

地球绕着太阳转，月球绕着地球转，月球绕着地球转了一圈。从月球的角度看，它是在地球的 "局部空间 "中旋转。尽管它相对于太阳的运动是一些疯狂的像螺线图一样的曲线，但从月球的角度来看，它只需要关注自身围绕地球这个局部空间的旋转即可。

想象一下，我们要做一个太阳、地球和月亮的图。我们先从太阳开始，只需制作一个球体，并将其置于原点。注意：我们用太阳、地球、月亮来演示如何使用场景图。当然，真正的太阳、地球和月亮使用的是物理学，但为了我们的目的，我们将用场景图来伪造它。

```js
// 要更新旋转角度的对象数组
const objects = [];
 
// 一球多用
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(
  radius,
  widthSegments,
  heightSegments
);
 
const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5); // 扩大太阳的大小
scene.add(sunMesh);
objects.push(sunMesh);
```

我们使用的是一个低多边形球体（low-polygon sphere）。赤道周围只有 6 个分段。这是为了便于观察旋转情况。

因为我们会重用同一个球体，所以我们将太阳网格（sunMesh）的比例设置为 5x。

我们还将 phong 材质的 emissive 属性设置为黄色。phong 材质的放射属性（emissive）是基本上不受其他光照影响的固有颜色。光照会被添加到该颜色上。

我们也在场景的中心放置了一个点光源（point light）。稍后我们会介绍更多关于点光源的细节，但现在简单地说，点光源代表从一个点向各个方向发射的光源。

```js
{
  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.PointLight(color, intensity);
  scene.add(light);
}
```

为了便于观察，我们要把摄像头放在原点的正上方向下看。最简单的方法是使用 lookAt 函数。 lookAt 函数让摄像机从它的位置“看向”我们传递 lookAt 的位置。在这样做之前，我们需要告诉摄像机的顶部朝向哪个方向，或者说哪个方向是摄像机的 "上"。对于大多数情况来说，正 Y 是向上的就足够了，但是由于我们是直视下方，我们需要告诉摄像机正 Z 是向上的。

```js
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);
```

<code src="./demo/SceneGraphSun.tsx"></code>

现在让我们把地球（earth）也加进去。

```js
const earthMaterial = new THREE.MeshPhongMaterial({
  color: 0x2233ff,
  emissive: 0x112244,
});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthMesh.position.x = 10;
scene.add(earthMesh);
objects.push(earthMesh);
```

我们做的材料是蓝色的，但是我们给它加了少量的放射蓝（emissive blue），这样它就会在我们的黑色背景下显示出来。

我们使用相同的 sphereGeometry 和新的蓝色的 earthMaterial 来制作一个 earthMesh 。我们将其定位在太阳的左边 10 个单位，并将其添加到场景中。由于我们将它添加到了我们的 objects 数组中，所以它也会旋转。


<code src="./demo/SceneGraphSunEarth.tsx"></code>

你可以看到太阳和地球都在自转，但地球并没有绕着太阳转。让我们把地球变成太阳的子节点吧。

```diff
- scene.add(earthMesh);
+ sunMesh.add(earthMesh);
```


<code src="./demo/SceneGraphSunEarthOrbit.tsx"></code>


我们让 earthMesh 成为 sunMesh 的一个子节点。sunMesh.scale.set(5, 5, 5) 将其比例设置为 5x。这意味着 sunMeshs 的局部空间是 5 倍大。这表示地球现在大了 5 倍，它与太阳的距离 ( earthMesh.position.x = 10 ) 也是 5 倍。


目前，我们的场景图是这样的：

![场景图](./images/scenegraph-sun-earth.svg '场景图')


为了解决这个问题，我们添加一个空的场景图节点。我们将把太阳和地球都作为该节点的子节点。

```diff
+ const solarSystem = new THREE.Object3D();
+ scene.add(solarSystem);
+ objects.push(solarSystem);
 
const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);
- scene.add(sunMesh);
+ solarSystem.add(sunMesh);
objects.push(sunMesh);
 
const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthMesh.position.x = 10;
- sunMesh.add(earthMesh);
+ solarSystem.add(earthMesh);
objects.push(earthMesh);
```

这里我们创建了一个 Object3D 。像 Mesh 一样，它也是场景图中的一个节点，但与 Mesh 不同的是，它没有材质（material）和几何体（geometry）。它只是代表一个局部空间。

我们的新场景图是这样的：

![场景图](./images/scenegraph-sun-earth-fixed.svg '场景图')

sunMesh 和 earthMesh 都是 solarSystem 的子网格。三者都在旋转，现在因为 earthMesh 不是 sunMesh 的子网格，所以不再按 5 倍比例缩放。

<code src="./demo/SceneGraphSunEarthOrbitFixed.tsx"></code>

延续同样的模式，我们再加一个月亮。

```diff
+ const earthOrbit = new THREE.Object3D();
+ earthOrbit.position.x = 10;
+ solarSystem.add(earthOrbit);
+ objects.push(earthOrbit);
 
const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
- earthMesh.position.x = 10; // 注意，这个偏移量已经在它的父对象THREE.Object3D "earthOrbit "中设置了。
- solarSystem.add(earthMesh);
+ earthOrbit.add(earthMesh);
objects.push(earthMesh);
 
+ const moonOrbit = new THREE.Object3D();
+ moonOrbit.position.x = 2;
+ earthOrbit.add(moonOrbit);
 
+ const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
+ const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
+ moonMesh.scale.set(.5, .5, .5);
+ moonOrbit.add(moonMesh);
+ objects.push(moonMesh);
```

我们再次添加了更多的隐形场景图节点。首先是一个名为 earthOrbit 的 Object3D ，并将新增 earthMesh 和 moonOrbit 都添加到其中。然后，我们把 moonMesh 添加到 moonOrbit 上。

新的场景图是这样的：

![场景图](./images/scenegraph-sun-earth-moon.svg '场景图')

<code src="./demo/SceneGraphSunEarthMoon.tsx"></code>

你可以看到月亮照着本文开头所提到的螺线图形式旋转，但我们不必手动计算它。我们只需要设置我们的场景图来为我们做这件事。

绘制一些东西来可视化场景图中的节点通常很有用。Three.js 有一些很有帮助的, 其中一个叫做 AxesHelper 。它画了 3 条线，分别代表本地的 X， Y， 以及 Z轴。让我们为我们创建的每个节点都加上一个。

```js
// 为每个节点添加一个AxesHelper
objects.forEach((node) => {
  const axes = new THREE.AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  node.add(axes);
});
```

在我们的例子中，我们希望轴即使在球体内部也能出现。要做到这一点，我们将其材质（material）的 depthTest 属性设置为 false，这意味着它们不会检查其是否在其他东西后面进行绘制。我们还将它们的 renderOrder 属性设置为 1（默认值为 0），这样它们就会在所有球体之后被绘制。否则一个球体可能会画在它们上面，把它们遮住。

<code src="./demo/SceneGraphSunEarthMoonAxes.tsx"></code>


我们可以看到x (红色) 和 z (蓝色)轴。由于我们是直视下方，而每个物体只是围绕 y 轴旋转，所以我们看不到y (绿色)轴。

可能很难看到其中一些轴，因为有 2 对重叠的轴。sunMesh 和 solarSystem 都在同一位置。同样地，earthMesh 和 earthOrbit 也在同一位置。让我们添加一些简单的控制方法，让我们可以为每个节点打开/关闭它们。同时，我们还可以添加另一个名为 GridHelper 的帮助工具。它可以在 X,Z 平面上创建一个 2D 网格。默认情况下，网格是 10x10 单位。

我们还将使用lil-gui，这是一个在 three.js 项目中非常流行的 UI 库。lil-gui 会获取一个对象和该对象上的属性名，并根据属性的类型自动生成一个 UI 来操作该属性。

我们要为每个节点制作一个 GridHelper 和一个 AxesHelper。我们需要为每个节点添加一个标签，所以我们将删除旧的循环，转而调用一些函数为每个节点添加帮助程序。


```diff
- objects.forEach((node) => {
-   const axes = new THREE.AxesHelper();
-   axes.material.depthTest = false;
-   axes.renderOrder = 1;
-   node.add(axes);
- });

+ function makeAxisGrid(node, label, units) {
+   const helper = new AxisGridHelper(node, units);
+   gui.add(helper, 'visible').name(label);
+ }
+ makeAxisGrid(solarSystem, 'solarSystem', 25);
+ makeAxisGrid(sunMesh, 'sunMesh');
+ makeAxisGrid(earthOrbit, 'earthOrbit');
+ makeAxisGrid(earthMesh, 'earthMesh');
+ makeAxisGrid(moonOrbit, 'moonOrbit');
+ makeAxisGrid(moonMesh, 'moonMesh');
```

makeAxisGrid 创建了一个 AxisGridHelper 类，这是一个我们将创建的让 lil-gui 满意的类。就像上面说的那样，lil-gui 会自动地生成一个 UI 来操作某个对象的命名属性。它将根据属性的类型创建不同的 UI。我们希望它创建一个复选框，所以我们需要指定一个 bool 属性。但是，我们希望坐标轴和网格都能基于一个单一的属性出现/消失，所以我们将创建一个类，其有一个属性绑定了 getter 和 setter。这样我们就可以让 lil-gui 认为它在操作一个单一的属性，但是在内部我们可以为一个节点设置 AxesHelper 和 GridHelper 的可见（visible）属性。

```js
// 打开/关闭轴和网格的可见性
// lil-gui 要求一个返回类型为bool型的属性
// 来创建一个复选框，所以我们为 `visible`属性
// 绑定了一个setter 和 getter。 从而让lil-gui
// 去操作该属性.
class AxisGridHelper {
  constructor(node, units = 10) {
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 2; // 在网格渲染之后再渲染
    node.add(axes);
 
    const grid = new THREE.GridHelper(units, units);
    grid.material.depthTest = false;
    grid.renderOrder = 1;
    node.add(grid);
 
    this.grid = grid;
    this.axes = axes;
    this.visible = false;
  }
  get visible() {
    return this._visible;
  }
  set visible(v) {
    this._visible = v;
    this.grid.visible = v;
    this.axes.visible = v;
  }
}
```

需要注意的是，我们将 AxesHelper 的 renderOrder 设置为 2，将GridHelper的设置为 1，这样轴就会在网格之后绘制。否则网格可能会覆盖轴。

<code src="./demo/SceneGraphSunEarthMoonAxesGrids.tsx"></code>




