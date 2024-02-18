---
title: 图元
toc: menu
order: 4
---


# 图元

图元就是一些 3D 的形状，在运行时根据大量参数生成。

使用图元是种很常见的做法，像使用球体作为地球，或者使用大量盒子来绘制 3D 图形。

对大多数 3D 应用来说，更常见的做法是在 3D 建模软件中创建 3D 模型， 像 Blender，Maya 或者 Cinema 4D。

## BufferGeometry

可以根据坐标点信息组成几何体面。

是面片、线或点几何体的有效表述。包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值。使用 BufferGeometry 可以有效减少向 GPU 传输上述数据所需的开销。


<code src="./demo/BufferGeometry.tsx"></code>



## BoxGeometry 立方缓冲几何体

BoxGeometry 是四边形的原始几何类，它通常使用构造函数所提供的 “width”、“height”、“depth” 参数来创建立方体或者不规则四边形。

构造函数（Constructor）

width — X 轴上面的宽度，默认值为 1。

height — Y 轴上面的高度，默认值为 1。

depth — Z 轴上面的深度，默认值为 1。

widthSegments — （可选）宽度的分段数，默认值是 1。

heightSegments — （可选）高度的分段数，默认值是 1。

depthSegments — （可选）深度的分段数，默认值是 1。

```js
const geometry = new THREE.BoxGeometry(1,1,1); 
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube );
```


<code src="./demo/BoxGeometry.tsx"></code>



## CircleGeometry 圆形缓冲几何体

CircleGeometry是欧式几何的一个简单形状，它由围绕着一个中心点的三角分段的数量所构造，由给定的半径来延展。 同时它也可以用于创建规则多边形，其分段数量取决于该规则多边形的边数。


构造器
CircleGeometry(radius : Float, segments : Integer, thetaStart : Float, thetaLength : Float)

radius — 圆形的半径，默认值为1

segments — 分段（三角面）的数量，最小值为3，默认值为32。

thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）

thetaLength — 圆形扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆。

```js
const geometry = new THREE.CircleGeometry( 5, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const circle = new THREE.Mesh( geometry, material );
scene.add( circle );
```

<code src="./demo/CircleGeometry.tsx"></code>

## ConeGeometry 圆锥缓冲几何体

一个用于生成圆锥几何体的类。


radius — 圆锥底部的半径，默认值为1。

height — 圆锥的高度，默认值为1。

radialSegments — 圆锥侧面周围的分段数，默认为32。

heightSegments — 圆锥侧面沿着其高度的分段数，默认值为1。

openEnded — 一个Boolean值，指明该圆锥的底面是开放的还是封顶的。默认值为false，即其底面默认是封顶的。

thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）

thetaLength — 圆锥底面圆扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆锥。


```js
const geometry = new THREE.ConeGeometry( 5, 20, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh( geometry, material );
scene.add( cone );
```

<code src="./demo/ConeGeometry.tsx"></code>

## CylinderGeometry 圆柱缓冲几何体

一个用于生成圆柱几何体的类。

```js
const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder );
```
radiusTop — 圆柱的顶部半径，默认值是1。

radiusBottom — 圆柱的底部半径，默认值是1。

height — 圆柱的高度，默认值是1。

radialSegments — 圆柱侧面周围的分段数，默认为32。

heightSegments — 圆柱侧面沿着其高度的分段数，默认值为1。

openEnded — 一个Boolean值，指明该圆锥的底面是开放的还是封顶的。默认值为false，即其底面默认是封顶的。

thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）

thetaLength — 圆柱底面圆扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆柱。

<code src="./demo/CylinderGeometry.tsx"></code>


## DodecahedronGeometry 十二面缓冲几何体
一个用于创建十二面几何体的类。

radius — 十二面体的半径，默认值为1。

detail — 默认值为0。将这个值设为一个大于0的数将会为它增加一些顶点，使其不再是一个十二面体。

<code src="./demo/DodecahedronGeometry.tsx"></code>



## ExtrudeGeometry 挤压缓冲几何体

从一个形状路径中，挤压出一个BufferGeometry。


* shapes — 形状或者一个包含形状的数组。
* options — 一个包含有下列参数的对象：
    * curveSegments — int，曲线上点的数量，默认值是12。
    * steps — int，用于沿着挤出样条的深度细分的点的数量，默认值为1。
    * depth — float，挤出的形状的深度，默认值为1。
    * bevelEnabled — bool，对挤出的形状应用是否斜角，默认值为true。
    * bevelThickness — float，设置原始形状上斜角的厚度。默认值为0.2。
    * bevelSize — float。斜角与原始形状轮廓之间的延伸距离，默认值为bevelThickness-0.1。
    * bevelOffset — float. Distance from the shape outline that the bevel starts. Default is 0.
    * bevelSegments — int。斜角的分段层数，默认值为3。
    * extrudePath — THREE.Curve对象。一条沿着被挤出形状的三维样条线。Bevels not supported for path extrusion.
    * UVGenerator — Object。提供了UV生成器函数的对象。

<code src="./demo/ExtrudeGeometry.tsx"></code>
<code src="./demo/ExtrudeGeometry1.tsx"></code>


## IcosahedronGeometry 二十面体

* radius — 二十面体的半径，默认为1。

* detail — 默认值为0。将这个值设为一个大于0的数将会为它增加一些顶点，使其不再是一个二十面体。当这个值大于1的时候，实际上它将变成一个球体。

<code src='./demo/IcosahedronGeometry.tsx'></code>

## LatheGeometry 车削缓冲几何体

创建具有轴对称性的网格，比如花瓶。车削绕着Y轴来进行旋转。

1. points — 一个Vector2对象数组。每个点的X坐标必须大于0。 Default is an array with (0,-0.5), (0.5,0) and (0,0.5) which creates a simple diamond shape.
2. segments — 要生成的车削几何体圆周分段的数量，默认值是12。
3. phiStart — 以弧度表示的起始角度，默认值为0。
4. phiLength — 车削部分的弧度（0-2PI）范围，2PI将是一个完全闭合的、完整的车削几何体，小于2PI是部分的车削。默认值是2PI。


```js
const points = [];
for ( let i = 0; i < 10; ++ i ) {
	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 3 + 3, ( i - 5 ) * .8 ) );
}

const segments = 12;  
const phiStart = Math.PI * 0.25;  
const phiLength = Math.PI * 1.5;  
const geometry = new THREE.LatheGeometry( points, segments, phiStart, phiLength );
```

<code src="./demo/LatheGeometry.tsx"></code>

## OctahedronGeometry 八面缓冲几何体

一个用于创建八面体的类。

1. radius — 八面体的半径，默认值为1。
2. detail — 默认值为0，将这个值设为一个大于0的数将会为它增加一些顶点，使其不再是一个八面体。

```js
const radius = 7;
const detail = 2;
const geometry = new OctahedronGeometry( radius, detail );
```

<code src="./demo/OctahedronGeometry.tsx"></code>

## ParametricGeometry 参数化缓冲几何体

生成由参数表示其表面的几何体。


1. func — 一个函数，它接受 u 和 v 值，每个值都在 0 到 1 之间，并修改第三个参数。 默认是生成曲面的函数。
2. slices — 用于参数函数的切片计数。 默认为8
3. stacks — 用于参数函数的堆栈计数。 默认值为8

```js
const geometry = new THREE.ParametricGeometry( THREE.ParametricGeometries.klein, 25, 25 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const klein = new THREE.Mesh( geometry, material );
scene.add( klein );
```

<code src="./demo/ParametricGeometry.tsx"></code>

## PlaneGeometry 平面缓冲几何体

```js
const geometry = new THREE.PlaneGeometry( 1, 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
```
1. width — 平面沿着 X 轴的宽度。默认值是 1。
2. height — 平面沿着 Y 轴的高度。默认值是 1。
3. widthSegments — （可选）平面的宽度分段数，默认值是 1。
4. heightSegments — （可选）平面的高度分段数，默认值是 1。

<code src="./demo/PlaneGeometry.tsx"></code>


## PolyhedronGeometry 多面几何体


多面体在三维空间中具有一些平面的立体图形。这个类将一个顶点数组投射到一个球面上，之后将它们细分为所需的细节级别。 这个类由DodecahedronGeometry、IcosahedronGeometry、OctahedronGeometry和TetrahedronGeometry 所使用，以生成它们各自的几何结构。

```js
const verticesOfCube = [
    -1,-1,-1,
    1,-1,-1,
    1, 1,-1,
    -1, 1,-1,
    -1,-1, 1,
    1,-1, 1,
    1, 1, 1,
    -1, 1, 1,
];

const indicesOfFaces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
];

const geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );
```


1. vertices — 一个顶点Array（数组）：[1,1,1, -1,-1,-1, ... ]。
2. indices — 一个构成面的索引Array（数组）， [0,1,2, 2,3,0, ... ]。
3. radius — Float - 最终形状的半径。
4. detail — Integer - 将对这个几何体细分多少个级别。细节越多，形状就越平滑。

<code src="./demo/PolyhedronGeometry.tsx"></code>


## RingGeometry 平面圆环

一个用于生成二维圆环几何体的类。

```js
const geometry = new THREE.RingGeometry( 1, 5, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
```

1. innerRadius — 内部半径，默认值为0.5。
2. outerRadius — 外部半径，默认值为1。
3. thetaSegments — 圆环的分段数。这个值越大，圆环就越圆。最小值为3，默认值为32。
4. phiSegments — 圆环半径的分段数字。最小值为1，默认值为1。
5. thetaStart — 起始角度，默认值为0。
6. thetaLength — 圆心角，默认值为Math.PI * 2。

<code src="./demo/RingGeometry.tsx"></code>


## ShapeGeometry 形状缓冲几何体

从一个或多个路径形状中创建一个单面多边形几何体。

```js

// 使用贝塞尔曲线绘制路径

const x = 0, y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

const geometry = new THREE.ShapeGeometry( heartShape );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material ) ;
scene.add( mesh );

```

1. shapes — 一个单独的shape，或者一个包含形状的Array。Default is a single triangle shape.
2. curveSegments - Integer - 每一个形状的分段数，默认值为12。

<code src="./demo/ShapeGeometry.tsx"></code>


## SphereGeometry 球缓冲几何体

一个用于生成球体的类。

```js
const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
```

1. radius — 球体半径，默认为1。
2. widthSegments — 水平分段数（沿着经线分段），最小值为3，默认值为32。
3. heightSegments — 垂直分段数（沿着纬线分段），最小值为2，默认值为16。
4. phiStart — 指定水平（经线）起始角度，默认值为0。。
5. phiLength — 指定水平（经线）扫描角度的大小，默认值为 Math.PI * 2。
6. thetaStart — 指定垂直（纬线）起始角度，默认值为0。
7. thetaLength — 指定垂直（纬线）扫描角度大小，默认值为 Math.PI。

该几何体是通过扫描并计算围绕着Y轴（水平扫描）和X轴（垂直扫描）的顶点来创建的。 因此，不完整的球体（类似球形切片）可以通过为phiStart，phiLength，thetaStart和thetaLength设置不同的值来创建， 以定义我们开始（或结束）计算这些顶点的起点（或终点）。

<code src="./demo/SphereGeometry.tsx"></code>



## TetrahedronGeometry 四面几何体

一个用于生成四面几何体的类。

```js
const radius = 7;
const detail = 2;
const geometry = new THREE.TetrahedronGeometry( radius, detail );
```


1. radius — 四面体的半径，默认值为1。
2. detail — 默认值为0。将这个值设为一个大于0的数将会为它增加一些顶点，使其不再是一个四面体。

<code src="./demo/TetrahedronGeometry.tsx"></code>

## TextGeometry 文本缓冲几何体

一个用于将文本生成为单一的几何体的类。


```js
const loader = new FontLoader();

loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

  const geometry = new TextGeometry( 'Hello three.js!', {
    font: font,
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelSegments: 5
  } );
} );
```


1. font — THREE.Font的实例。
2. size — Float。字体大小，默认值为100。
3. height — Float。挤出文本的厚度。默认值为50。
4. curveSegments — Integer。（表示文本的）曲线上点的数量。默认值为12。
5. bevelEnabled — Boolean。是否开启斜角，默认为false。
6. bevelThickness — Float。文本上斜角的深度，默认值为20。
7. bevelSize — Float。斜角与原始文本轮廓之间的延伸距离。默认值为8。
8. bevelSegments — Integer。斜角的分段数。默认值为3。

<code src="./demo/TextGeometry.tsx"></code>

















