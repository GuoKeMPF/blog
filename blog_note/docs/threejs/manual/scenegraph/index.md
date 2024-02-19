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



