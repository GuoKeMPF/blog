# 基础

## 介绍

Three.js是一个尽可能简化在网页端获取3D 内容的库。

Three.js经常会和WebGL混淆， 但也并不总是，three.js其实是使用WebGL来绘制三维效果的。 WebGL是一个只能画点、线和三角形的非常底层的系统. 想要用WebGL来做一些实用的东西通常需要大量的代码， 这就是Three.js的用武之地。它封装了诸如场景、灯光、阴影、材质、贴图、空间运算等一系列功能，让你不必要再从底层WebGL开始写起。

![threejs 结构图](./images/threejs-structure.svg 'threejs 结构图')

1. 首先有一个渲染器(Renderer)。这可以说是three.js的主要对象。你传入一个场景(Scene)和一个摄像机(Camera)到渲染器(Renderer)中，然后它会将摄像机视椎体中的三维场景渲染成一个二维图片显示在画布上。

2. 场景图它是一个树状结构，由很多对象组成，比如图中包含了一个场景(Scene)对象 ，多个网格(Mesh)对象，光源(Light)对象，群组(Group)，三维物体(Object3D)，和摄像机(Camera)对象。一个场景(Scene)对象定义了场景图最基本的要素，并包了含背景色和雾等属性。这些对象通过一个层级关系明确的树状结构来展示出各自的位置和方向。子对象的位置和方向总是相对于父对象而言的。比如说汽车的轮子是汽车的子对象，这样移动和定位汽车时就会自动移动轮子。

3. 摄像机(Camera)是一半在场景图中，一半在场景图外的。这表示在three.js中，摄像机(Camera)和其他对象不同的是，它不一定要在场景图中才能起作用。相同的是，摄像机(Camera)作为其他对象的子对象，同样会继承它父对象的位置和朝向。

3. 网格(Mesh)对象可以理解为用一种特定的材质(Material)来绘制的一个特定的几何体(Geometry)。材质(Material)和几何体(Geometry)可以被多个网格(Mesh)对象使用。比如在不同的位置画两个蓝色立方体，我们会需要两个网格(Mesh)对象来代表每一个立方体的位置和方向。但只需一个几何体(Geometry)来存放立方体的顶点数据，和一种材质(Material)来定义立方体的颜色为蓝色就可以了。两个网格(Mesh)对象都引用了相同的几何体(Geometry)和材质(Material)。

4. 几何体(Geometry)对象顾名思义代表一些几何体，如球体、立方体、平面、狗、猫、人、树、建筑等物体的顶点信息。Three.js内置了许多基本几何体 。你也可以创建自定义几何体或从文件中加载几何体。

5. 材质(Material)对象代表绘制几何体的表面属性，包括使用的颜色，和光亮程度。一个材质(Material)可以引用一个或多个纹理(Texture)，这些纹理可以用来，打个比方，将图像包裹到几何体的表面。

6. 纹理(Texture)对象通常表示一幅要么从文件中加载，要么在画布上生成，要么由另一个场景渲染出的图像。

7. 光源(Light)对象代表不同种类的光。

:::info
注意图中摄像机(Camera)是一半在场景图中，一半在场景图外的。这表示在three.js中，摄像机(Camera)和其他对象不同的是，它不一定要在场景图中才能起作用。相同的是，摄像机(Camera)作为其他对象的子对象，同样会继承它父对象的位置和朝向。在场景图这篇文章的结尾部分有放置多个摄像机(Camera)在一个场景中的例子。
:::

## 示例

![示例结构图](./images/threejs-1cube-no-light-scene.svg '示例结构图')

1. 引入three.js

```js
<script type="module">
import * as THREE from 'three';
</script>
```

把`type="module"`放到script标签中很重要。这可以让我们使用`import`关键字加载three.js。还有其他的方法可以加载three.js，但是自**r106**开始，使用模块是最推荐的方式。模块的优点是可以很方便地导入需要的其他模块。这样我们就不用再手动引入它们所依赖的其他文件了。

2. 创建画布

创建`<canvas>`标签。

```js
<body>
  <canvas id="c"></canvas>
</body>
```

Three.js需要使用这个canvas标签来绘制，所以我们要先获取它然后传给three.js。

```diff
import * as THREE from 'three';

+ function main() {
+   const canvas = document.querySelector('#c');
+   const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
+   ...
+ }
+ main()

```

3. 创建渲染器和相机

拿到canvas后我们需要创建一个WebGL渲染器(WebGLRenderer)。渲染器负责将你提供的所有数据渲染绘制到canvas上。

注意这里有一些细节。如果你没有给three.js传canvas，three.js会自己创建一个 ，但是你必须手动把它添加到文档中。在哪里添加可能会不一样这取决你怎么使用， 我发现给three.js传一个canvas会更灵活一些。我可以将canvas放到任何地方， 代码都会找到它，假如我有一段代码是将canvas插入到文档中，那么当需求变化时， 我很可能必须去修改这段代码。

接下来我们需要一个透视摄像机(PerspectiveCamera)。

```js
const fov = 75;
const aspect = 2;  // 相机默认值
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
```

- **fov**是视野范围(field of view)的缩写。上述代码中是指垂直方向为75度。 注意three.js中大多数的角用弧度表示，但是因为某些原因透视摄像机使用角度表示。

- **aspect**指画布的宽高比。我们将在别的文章详细讨论，在默认情况下 画布是300x150像素，所以宽高比为300/150或者说2。

- **near**和**far**代表近平面和远平面，它们限制了摄像机面朝方向的可绘区域。 任何距离小于或超过这个范围的物体都将被裁剪掉(不绘制)。

这四个参数定义了一个 "**视椎**(frustum)"。 视椎(frustum)是指一个像被削去顶部的金字塔形状。换句话说，可以把"视椎(frustum)"想象成其他三维形状如球体、立方体、棱柱体、截椎体。

![视锥](./images/frustum-3d.svg '视锥')

近平面和远平面的高度由视野范围决定，宽度由视野范围和宽高比决定。

视椎体内部的物体将被绘制，视椎体外的东西将不会被绘制。

摄像机默认指向Z轴负方向，上方向朝向Y轴正方向。我们将会把立方体放置在坐标原点，所以我们需要往后移一下摄像机才能显示出物体。

![摄像机](./images/scene-down.svg '摄像机默认指向Z轴负方向，上方向朝向Y轴正方向')

我们能看到摄像机的位置在z = 2。它朝向Z轴负方向。我们的视椎体范围从摄像机前方0.1到5。

4. 创建场景

场景(Scene)是three.js的基本的组成部分。需要three.js绘制的东西都需要加入到scene中。 我们将会在场景是如何工作的一文中详细讨论。

```javascript
const scene = new THREE.Scene();
```

然后创建一个包含盒子信息的立方几何体(BoxGeometry)。几乎所有希望在three.js中显示的物体都需要一个包含了组成三维物体的顶点信息的几何体。

```javascript
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
```

然后创建一个基本的材质并设置它的颜色. 颜色的值可以用css方式和十六进制来表示。

```javascript
const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
```

再创建一个网格(Mesh)对象，它包含了：

- 几何体(Geometry)(物体的形状)
- 材质(Material)(如何绘制物体，光滑还是平整，什么颜色，什么贴图等等)
- 对象在场景中相对于他父对象的位置、朝向、和缩放。下面的代码中父对象即为场景对象。

```javascript
const cube = new THREE.Mesh(geometry, material);
```

最后我们将网格添加到场景中。

```js
scene.add(cube);
```

之后将场景和摄像机传递给渲染器来渲染出整个场景。

```js
renderer.render(scene, camera);
```

<code src="./demo/cube.tsx" title="方块"></code>

很难看出来这是一个三维的立方体，因为我们直视Z轴的负方向并且立方体和坐标轴是对齐的，所以我们只能看到一个面。

我们来让立方体旋转起来，以便更好的在三维环境中显示。为了让它动起来我们需要用到一个渲染循环函数 requestAnimationFrame.

```js
function render() {
  cube.rotation.x = (cube.rotation.x + 0.001) % Math.PI;
  cube.rotation.y = (cube.rotation.y + 0.001) % Math.PI;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
```

<code src="./demo/cubeAnimation.tsx" title="方块旋转"></code>

效果好了一些但还是很难看出是三维的。我们来添加些光照效果，应该会有点帮助。three.js中有很多种类型的灯光，现在我们先创建一盏平行光。

```js
{
  const color = 0xFFFFFF;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}
```

平行光有一个位置和目标点。默认值都为(0, 0, 0)。我们这里 将灯光的位置设为(-1, 2, 4)，让它位于摄像机前面稍微左上方一点的地方。目标点还是(0, 0, 0)，让它朝向坐标原点方向。

我们还需要改变下立方体的材质。MeshBasicMaterial材质不会受到灯光的影响。我们将他改成会受灯光影响的MeshPhongMaterial材质。

```diff
- const material = new THREE.MeshBasicMaterial({color: 0x44aa88});  // 绿蓝色
+ const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // 绿蓝色
```

<code src="./demo/cubeLight.tsx" title="灯光"></code>

![项目结构](./images/threejs-1cube-with-directionallight.svg '项目结构')

每个立方体会引用同一个几何体和不同的材质，这样每个立方体将会是不同的颜色。

首先我们创建一个根据指定的颜色生成新材质的函数。它会根据指定的几何体生成对应网格，然后将网格添加进场景并设置其X轴的位置。

```js
function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({color});
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = x;
  return cube;
}
```

然后我们将用三种不同的颜色和X轴位置调用三次函数，将生成的网格实例存在一个数组中。

```js
const cubes = [
  makeInstance(geometry, 0x44aa88,  0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844,  2),
];
```

最后我们将在渲染函数中旋转三个立方体。我们给每个立方体设置了稍微不同的旋转角度。

```js
function render(time) {
  time *= 0.001;  // 将时间单位变为秒
  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });
}
```

<code src="./demo/cubes.tsx" title="立方块"></code>

如果你对比上面的示意图可以看到此效果符合我们的预想。位置为X = -2 和 X = +2的立方体有一部分在我们的视椎体外面。他们大部分是被包裹的，因为水平方向的视角非常大。

![立方块](./images/threejs-3cubes-scene.svg '立方块')
