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






