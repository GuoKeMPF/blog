# 材质

材质（material）,它们定义了对象在场景中的外型。

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

那么，我们就来看看three.js的几个材质。

MeshBasicMaterial 不受光照的影响。
MeshLambertMaterial 只在顶点计算光照。
MeshPhongMaterial 则在每个像素计算光照，还支持镜面高光。


















