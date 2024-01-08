# gradient

**gradient** CSS 数据类型 是 <image> 的一种特殊类型，包含两种或多种颜色的过渡转变。

CSS 渐变没有内在尺寸，也就是说，它没有固有或首选的尺寸，也没有首选的比例，其实际大小取决于所应用的元素的大小。


## 语法

gradient 数据类型是由下面列出的函数类型中的一个定义的。

线性渐变
线性渐变会在一个假想的直线上过渡颜色。线性渐变是由 linear-gradient() 函数产生的。

径向渐变
径向渐变从一个中间点（原点）开始过渡颜色。径向渐变是由 radial-gradient() 函数产生的。

重复渐变
重复渐变可根据需要复制渐变，以填充指定区域。重复渐变是使用 repeating-linear-gradient() 和 repeating-radial-gradient() 函数生成的。

锥形渐变
锥形渐变会沿着一个圆过渡颜色。锥形渐变是由 conic-gradient() 函数产生的。

<code src="./index.tsx" title="渐变色"></code>
