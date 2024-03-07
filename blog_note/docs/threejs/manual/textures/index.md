---
title: 纹理
order: 7
---

# 纹理


纹理一般是指我们常见的在一些第三方程序中创建的图像，如Photoshop或GIMP。比如我们把这张图片放在立方体上。

![demo](./demo/images/wall.jpg)

<code src="./demo/TexturedCube.tsx"></code>

6个纹理，一个立方体的每个面都有一个，我们只需制作6种材料，并在创建 Mesh 时将它们作为一个数组传递给它们。

<code src="./demo/TexturedCube6Textures.tsx"></code>





