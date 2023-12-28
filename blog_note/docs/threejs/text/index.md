# 创建文字

在 threejs 中创建文字有一下几种方法

1. DOM + CSS

使用HTML通常是最简单、最快速的添加文本的方法，这是大多数的Three.js示例中用于添加描述性叠加文字的方法。

你可以在这里添加内容

```html
<div id="info">Description</div>
```

然后使用CSS来将其绝对定位在其它具有z-index的元素之上，尤其是当你全屏运行three.js的时候。

```css
#info{
  position: absolute;
  top: 10px;
  width: 100%;
  text-align: center;
  z-index: 100;
  display:block;
}
```

2. 将文字绘制到画布中，并将其用作Texture（纹理）

<code src="./Texture.tsx"></code>

3. 使用原生 dom 插入到场景中

<code src="./CSS2d.tsx"></code>
