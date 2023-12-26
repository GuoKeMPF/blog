# WebGL 兼容性检查

WebGL 兼容性检查是指在浏览器中运行 WebGL 代码时，检查浏览器是否支持 WebGL 功能。如果不支持则提示或者降级处理。



```js | pure
import WebGL from 'three/addons/capabilities/WebGL.js';
if ( WebGL.isWebGLAvailable() ) {
	// Initiate function or other initializations here
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}
```



