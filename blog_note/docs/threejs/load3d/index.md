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

<code src="./index.tsx" title="3d loader"></code>
