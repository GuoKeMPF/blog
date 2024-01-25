# 响应式设计

1. 画布尺寸调整大小样式

通过 css 设置画布尺寸会导致画布内容拉伸模糊，通常通过设置画布尺寸调整大小样式。

可以通过 `renderer.setSize` 设置渲染场景大小，设置为 `false` 表示不调整画布尺寸，设置为 `true` 表示调整画布尺寸。

```js
  if (needResize) {
    // width, height 画布尺寸
    // updateStyle false updateStyle 默认通过 css 调整大小这样会拉伸模糊。通常设置成 false 避免这种情况。
    renderer.setSize(width, height, false);
  }
```

<code src="./demo/cube.tsx"></code>



2. 高分辨率显示器

HD-DPI代表每英寸高密度点显示器（显卡）。它指的是大多数的Mac和Windows机器以及几乎所有的智能手机。

浏览器中的工作方式是不管屏幕的分辨率，如果使用CSS像素设置尺寸会被认为是一样的。同样的物理尺寸浏览器会渲染出字体的更多细节。

通过 `renderer.setPixelRatio` 设置渲染场景的像素密度。

```js
renderer.setPixelRatio(window.devicePixelRatio);
```






