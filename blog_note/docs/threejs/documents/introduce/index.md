---
title: Three 介绍
order: 1
---




# Three

Threejs 由 一个场景 **scene**, 若干个物体 **object**, 一个相机 **camera**， 一个渲染器 **renderer**. 组成



-  **scene** 画面背景或者物体所处的环境，类似电影布景。
- 在js 中物品对象被称为网格 **mesh**, 他需要一个几何形状和材质组成。类似常见的三位模型，通过坐标点连线成面组成物体形状，再通过贴图实现物体的材质。使物品看上去更形象。
- 相机 **camera** 决定了物体在屏幕上的显示位置，他有 **field of view** (FOV),  **aspect ratio** (width / height), 一个 **near** 和一个 **far** 裁剪平面。
- 渲染器 **renderer** 负责将场景渲染到画布上，他需要指定画布的大小，并调用 render 方法来完成。通常是 `canvas` 标签通过指定画布尺寸并调用渲染方法，实现3D场景的渲染。


