---
title: Three 加载3D模型
order: 7
---



# 加载 3D 模型

根据3d软件导出文件，加载模型。

## 加载模型

```javascript
const loader = new GLTFLoader();
loader.load( 'path/to/model.glb', function ( gltf ) {
 scene.add( gltf.scene );
}, undefined, function ( error ) {
 console.error( error );
});
```

<code src="./Load3DDog.tsx" title="3d loader dogs"></code>



<code src="./Load3DDragon.tsx" title="3d loader dragon"></code>



