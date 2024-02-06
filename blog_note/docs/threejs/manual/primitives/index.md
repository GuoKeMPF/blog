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





