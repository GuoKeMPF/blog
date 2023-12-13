---
title: 过渡色文字



---


# 过渡色文字

通过设置字体颜色透明以及背景图像剪辑方式为文本，让元素显示文字形状剪辑后背景颜色实现效果


```css
.text{
  background-clip: text;               /* 背景图像剪辑方式为文本，即背景图像将被剪辑为文本的形状 */
	color: transparent;                  /* 文本颜色透明 */
	background-image: repeating-radial-gradient(circle at 20% 40%,     /* 背景图像为径向渐变，起始点为圆心坐标(20%, 40%) */
			#eea2a2 20px,                  /* 渐变起始颜色为#eea2a2，持续20px */
			#57c6e1 20px,                  /* 渐变颜色为#57c6e1，持续20px */
			#b49fda 40px,                  /* 渐变颜色为#b49fda，持续40px */
			#7ac5d8 40px,                  /* 渐变颜色为#7ac5d8，持续40px */
			#b49fda 60px,                  /* 渐变颜色为#b49fda，持续60px */
			#4f9c9c 60px,                  /* 渐变颜色为#4f9c9c，持续60px */
			#57c6e1 80px,                  /* 渐变颜色为#57c6e1，持续80px */
			#99cccc 80px,                  /* 渐变颜色为#99cccc，持续80px */
			#eea2a2 100px);                /* 渐变颜色为#eea2a2，持续100px */
}
```


<code src="./index.tsx"></code>


