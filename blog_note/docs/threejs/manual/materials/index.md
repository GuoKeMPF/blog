---
title: 材质
order: 6
---


# 材质

材质（material）,它们定义了对象在场景中的外型。

## 设置方法

有2种方法可以设置大部分的材质属性。一种是在实例化时设置，也就是我们之前看到的。

```js
const material = new THREE.MeshPhongMaterial({
  color: 0xFF0000,    // 红色 (也可以使用CSS的颜色字符串)
  flatShading: true,
});
```

另一种是在实例化之后再设置

```js
const material = new THREE.MeshPhongMaterial();
material.color.setHSL(0, 1, .5);  // 红色
material.flatShading = true;
```

注意，THREE.Color 类型的属性有多种设置方式。

```js
material.color.set(0x00FFFF);    // 同 CSS的 #RRGGBB 风格
material.color.set(cssString);   // 任何 CSS 颜色字符串, 比如 'purple', '#F32',
                                 // 'rgb(255, 127, 64)',
                                 // 'hsl(180, 50%, 25%)'
material.color.set(someColor)    // 其他一些 THREE.Color
material.color.setHSL(h, s, l)   // 其中 h, s, 和 l 从 0 到 1
material.color.setRGB(r, g, b)   // 其中 r, g, 和 b 从 0 到 1
```

在实例化时，你可以传递一个十六进制数字或CSS字符串作为参数。

```js
const m1 = new THREE.MeshBasicMaterial({color: 0xFF0000});         // 红色
const m2 = new THREE.MeshBasicMaterial({color: 'red'});            // 红色
const m3 = new THREE.MeshBasicMaterial({color: '#F00'});           // 红色
const m4 = new THREE.MeshBasicMaterial({color: 'rgb(255,0,0)'});   // 红色
const m5 = new THREE.MeshBasicMaterial({color: 'hsl(0,100%,50%)'}); // 红色
```

## Mesh Material

MeshBasicMaterial 不受光照的影响。
MeshLambertMaterial 只在顶点计算光照。
MeshPhongMaterial 则在每个像素计算光照，还支持镜面高光。

<code src="./demo/MaterialCubes.tsx"></code>


MeshPhongMaterial 的 shininess 设置决定了镜面高光的光泽度。它的默认值是30。

<code src="./demo/MeshPhongMaterial.tsx"></code>


将 MeshLambertMaterial 或 MeshPhongMaterial 的 emissive 属性设置为颜色，并将颜色设置为黑色(phong的 shininess 为0)，最终看起来就像 MeshBasicMaterial 一样。

<code src="./demo/MeshLambertMaterial.tsx"></code>

既然MeshBasicMaterial、MeshLambertMaterial可以做到的，MeshPhongMaterial也可以做到，那为什么还要有这3种材质呢？原因是更复杂的材质会消耗更多的GPU功耗。在一个较慢的GPU上，比如说手机，你可能想通过使用一个不太复杂的材质来减少绘制场景所需的GPU功耗。同样，如果你不需要额外的功能，那就使用最简单的材质。如果你不需要照明和镜面高光，那么就使用 MeshBasicMaterial 。

MeshToonMaterial 与 MeshPhongMaterial 类似，但有一个很大的不同。它不是平滑地着色，而是使用一个渐变图（一个X乘1的纹理（X by 1 texture））来决定如何着色。默认使用的渐变图是前70%的部分使用70%的亮度，之后的部分使用100%的亮度，当然，你可以定义你自己的渐变图。这最终会给人一种2色调的感觉，看起来就像卡通一样。

<code src="./demo/MeshToonMaterial.tsx"></code>

## Physically Based Rendering

接下来是2种基于物理渲染（Physically Based Rendering）的材质。Physically Based Rendering通常简称为PBR。

之前提到的材质使用简单的数学来制作，看起来是3D的，但它们并不是现实世界中实际存在的东西。2种PBR材质使用更复杂的数学来接近现实世界中的实际情况。

第一个是 MeshStandardMaterial。MeshPhongMaterial 和 MeshStandardMaterial 最大的区别是它们使用的参数不同。MeshPhongMaterial 有一个参数用来设置 shininess 属性。MeshStandardMaterial 有2个参数用来分别设置 roughness 和 metalness 属性。

在基本层面，roughness 是 shininess 的对立面。粗糙度（roughness）高的东西，比如棒球，就不会有很强烈的反光，而不粗糙的东西，比如台球，就很有光泽。粗糙度的范围从0到1。

另一个设定，metalness，说的是材质的金属度。金属与非金属的表现不同。0代表非金属，1代表金属。

这里是 MeshStandardMaterial 的一个快速示例，从左至右看，粗糙度从0到1，从上至下看，金属度从0到1。

<code src="./demo/MeshStandardMaterial.tsx"></code>


MeshPhysicalMaterial 与 MeshStandardMaterial 相同，但它增加了一个clearcoat 参数，该参数从0到1，决定了要涂抹的清漆光亮层的程度，还有一个 clearCoatRoughness 参数，指定光泽层的粗糙程度。

这里是和上面一样的按 metalness 划分的 roughness 网格，但可以设置 clearcoat 和 clearCoatRoughness 。

<code src="./demo/MeshPhysicalMaterial.tsx"></code>

各种标准材质的构建速度从最快到最慢：MeshBasicMaterial ➡ MeshLambertMaterial ➡ MeshPhongMaterial ➡ MeshStandardMaterial ➡ MeshPhysicalMaterial。构建速度越慢的材质，做出的场景越逼真，但在低功率或移动设备上，你可能需要思考代码的设计，使用构建速度较快的材质。

接下来的3种材质有特殊用途。ShadowMaterial 用于获取阴影创建的数据。我们还没有介绍过阴影。等到我们介绍的时候，我们会使用这个材质来看看其背后的原理。

MeshDepthMaterial 渲染每个像素的深度，其中处在摄像机负近端面的像素其深度为0，处在摄像机负远端面的像素其深度为1。



MeshNormalMaterial 会显示几何体的法线。法线是一个特定的三角形或像素所面对的方向。MeshNormalMaterial 会绘制视图空间法线（相对于摄像机的法线）。x 是红色, y 是绿色, 以及 z 是蓝色，所以朝向右边的东西是粉红色，朝向左边的是水蓝色，朝上的是浅绿色，朝下的是紫色，朝向屏幕的是淡紫色。

<code src="./demo/MeshNormalMaterial.tsx"></code>


ShaderMaterial 是通过three.js的着色器系统来制作自定义材质。RawShaderMaterial 则是可以用来制作完全自定义的着色器，不需要three.js的帮助。这两个材质涉及的话题都很广，我们后面会讲到。

大多数材质都共享一堆由 Material 定义的设置,先来看看两个最常用的属性。

flatShading：对象是否使用平面着色，默认为false。

<code src="./demo/FlatShading.tsx"></code>



side：要显示三角形的哪个面。默认值是 THREE.FrontSide，其他选项有 THREE.BackSide 和 THREE.DoubleSide（正反两面）。Three.js中，大多数3D对象可能都是不透明的实体，所以不需要绘制反面（面向实体内部的面）。设置 side 的最常见的原因是用于绘制平面或其他非实体对象，在这些对象中通常会看到三角形的反面。

下面是用 THREE.FrontSide 和 THREE.DoubleSide 绘制的6个平面。

<code src="./demo/Side.tsx"></code>


:::info{title="material.needsUpdate"}
这个话题很少影响大多数three.js应用，但仅供参考。

three.js会在使用材质时应用材质设置，其中 "使用 "意味着 "使用该材质的东西被渲染"。有些材质设置只应用一次，因为改变它们需要three.js做很多工作。在这种情况下，你需要设置 material.needsUpdate = true 来告诉 three.js 应用你的材质变化。当你在使用材质后再去更改设置，需要你去设置 needsUpdate的最常见的几种设置是：

* flatShading
* 添加或删除纹理
改变纹理是可以的，但是如果想从使用无纹理切换到使用纹理，或者从使用纹理切换到无纹理，那么你需要设置 needsUpdate = true。

在从有纹理到无纹理的情况下，往往是使用1x1像素的白色纹理更好。

如上所述，大多数应用程序从未遇到这些问题。大多数应用程序不会在平面阴影和非平面阴影之间切换。大多数应用程序也要么使用纹理，要么使用纯色给定的材料，他们很少从使用一个切换到使用另一个。
:::









