---
title: markdown
toc: menu
---

# Markdown

Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。

## 标题

使用 = 和 - 标记一级和二级标题

# 一级标题

## 二级标题

使用 # 号标记
使用 # 号可表示 1-6 级标题，一级标题对应一个 # 号，二级标题对应两个 # 号，以此类推。

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 段落

Markdown 段落没有特殊的格式，直接编写文字就好，段落的换行是使用两个以上空格加上回车。

当然也可以在段落后面使用一个空行来表示重新开始一个段落。

## 字体

Markdown 可以使用以下几种字体：

_斜体文本_
**粗体文本**
**_粗斜体文本_**

## 分隔线

可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：

---

分隔线

---

## 删除线

如果段落上的文字要添加删除线，只需要在文字的两端加上两个波浪线 ~~ 即可

~~删除线~~

## 下划线

下划线可以通过 HTML 的 \<u\> 标签来实现：

<u>带下划线文本</u>

## 列表

支持有序列表和无序列表。

无序列表使用星号(\*)、加号(+)或是减号(-)作为列表标记，这些标记后面要添加一个空格，然后再填写内容：

- 第一项
- 第二项
- 第三项

- 第一项
- 第二项
- 第三项

有序列表使用数字并加上 . 号来表示

1. 第一项
2. 第二项
3. 第三项

列表嵌套
列表嵌套只需在子列表中的选项前面添加两个或四个空格即可：

1. 第一项：
   - 第一项嵌套的第一个元素
   - 第一项嵌套的第二个元素
2. 第二项：
   - 第二项嵌套的第一个元素
   - 第二项嵌套的第二个元素

## 区块

区块引用是在段落开头使用 > 符号 ，然后后面紧跟一个空格符号,区块是可以嵌套的，一个 > 符号是最外层，两个 > 符号是第一层嵌套，以此类推：

> 区块引用

> 最外层
>
> > 第一层嵌套
> >
> > > 第二层嵌套

区块中使用列表
区块中使用列表实例如下：

> 区块中使用列表
>
> 1. 第一项
> 2. 第二项
>
> - 第一项
> - 第二项
> - 第三项

列表中使用区块
如果要在列表项目内放进区块，那么就需要在 > 前添加四个空格的缩进。

列表中使用区块实例如下：

- 第一项
  > 菜鸟教程
  > 学的不仅是技术更是梦想
- 第二项

## 代码

如果是段落上的一个函数或片段的代码可以用反引号把它包起来（`）

`printf('hello word')`

代码区块
代码区块使用 4 个空格或者一个制表符（Tab 键）。

    printf('hello word')

也可以用 ``` 包裹一段代码，并指定一种语言（也可以不指定）：

```c
printf('hello word')
```

## 链接

\[链接名称\]\(链接地址\ 链接 alt)或者\<链接地址\>

[那个老麻啊](https://mapanfeng.com/ '那个老麻啊的网站')

<https://mapanfeng.com/>

高级链接
可以通过变量来设置一个链接，变量赋值在文档末尾进行：

这个链接用 1 作为网址变量 [Google][1]

这个链接用 M 作为网址变量 [M][m]

[1]: http://www.google.com/
[m]: http://www.mapanfeng.com/

## 图片

开头一个感叹号 !  
接着一个方括号，里面放上图片的替代文字  
接着一个普通括号，里面放上图片的网址，最后还可以用引号包住并加上选择性的 'title' 属性的文字。

也可以像网址那样对图片网址使用变量:

\!\[alt 属性文本\]\(图片地址\)

\!\[alt 属性文本\]\(图片地址 \'可选标题\'\)

![background.jpg](./images/background.jpg)
![background.jpg](./images/background.jpg 'background')

## 表格

表格使用 | 来分隔不同的单元格，使用 - 来分隔表头和其他行。

对齐方式

可以设置表格的对齐方式：

-: 设置内容和标题栏居右对齐。
:- 设置内容和标题栏居左对齐。
:-: 设置内容和标题栏居中对齐。

|               表头 |        表头        | 表头               |
| -----------------: | :----------------: | :----------------- |
| 单元格单元格单元格 | 单元格单元格单元格 | 单元格单元格单元格 |
|             单元格 |       单元格       | 单元格             |

## 高级技巧

### 支持 HTML 元素

不在 Markdown 涵盖范围之内的标签，都可以直接在文档里面用 HTML 撰写。

使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑

### 转义

Markdown 使用了很多特殊符号来表示特定的意义，如果需要显示特定的符号则需要使用转义字符，Markdown 使用反斜杠转义特殊字符：

**文本加粗**\*\* 正常显示星号 \*\*

Markdown 支持以下这些符号前面加上反斜杠来帮助插入普通的符号：

\\ 反斜线

\` 反引号

\* 星号

\_ 下划线

\{\} 花括号

\[\] 方括号

\(\) 小括号

\# 井字号

\+ 加号

\- 减号

\. 英文句点

\! 感叹号

### 公式

#### Markdown 排版格式

1. 行内公式排版：

<pre>
$$ c = \sqrt{a^{2}+b_{xy}^{2}+e^{x}} $$
</pre>

$$ c = \sqrt{a^{2}+b_{xy}^{2}+e^{x}} $$

2. 块公式排版：

<pre>
$$ c = \sqrt{a^{2}+b_{xy}^{2} +e^{x}} $$
</pre>

$$ c = \sqrt{a^{2}+b_{xy}^{2} +e^{x}} $$

#### LaTex 的公式规则

##### 转义

一下几个字符: # \$ % & ~ \_ ^ \ { }有特殊意义，需要表示这些字符时，需要转义，即在每个字符前加上 \ 。
\boxed 命令给公式加一个方框。

<pre>
$E = mc^2 $
$ \boxed{E=mc^2} $
</pre>

$$E = mc^2 $$

$$\boxed{E=mc^2} $$

##### 希腊字母

| 编号 |           小写           |    大写    |       LaTeX 形式        |
| ---: | :----------------------: | :--------: | :---------------------: |
|    1 |         $\alpha$         |     A      |        \alpha A         |
|    2 |         $\beta$          |     B      |         \beta B         |
|    3 |         $\gamma$         |  $\Gamma$  |      \gamma \Gamma      |
|    4 |         $\delta$         |  $\Delta$  |     \delta \ Delta      |
|    5 | $\epsilon$ $\varepsilon$ |     E      | \epsilon \varepsilon E  |
|    6 |         $\zeta$          |     Z      |         \zeta Z         |
|    7 |          $\eta$          |     H      |         \eta H          |
|    8 |   $\theta$ $\vartheta$   |  $\Theta$  | \theta \vartheta \Theta |
|    9 |         $\iota$          |     I      |         \iota I         |
|   10 |         $\kappa$         |     K      |        \kappa K         |
|   11 |        $\lambda$         | $\Lambda$  |     \lambda \Lambda     |
|   12 |          $\mu$           |     M      |          \mu M          |
|   13 |          $\nu$           |     N      |          \nu N          |
|   14 |          $\xi$           |   $\Xi$    |         \xi \Xi         |
|   15 |        $\omicron$        |     O      |       \omicron O        |
|   16 |          $\pi$           |   $\Pi$    |           pi            |
|   17 |     $\rho$ $\varrho$     |     P      |     \rho \varrho P      |
|   18 |         $\sigma$         |  $\Sigma$  |      \sigma \Sigma      |
|   19 |          $\tau$          |     T      |         \tau T          |
|   20 |        $\upsilon$        | $\Upsilon$ |    \upsilon \Upsilon    |
|   21 |     $\phi$ $\varphi$     |   $\Phi$   |    \phi \varphi \Phi    |
|   22 |          $\chi$          |     X      |         \chi X          |
|   23 |          $\psi$          |   $\Psi$   |        \psi \Psi        |
|   24 |         $\omega$         |  $\Omega$  |      \omega \Omega      |

##### 上下标和根号

用\^来表示上标

用\_来表示下标

用\\sqrt 表示根号

上下标如果多余一个字符或符号，需要用{}括起来。

<pre>$ a_i $</pre>

$ a_i $

\sqrt[开方次数，默认为 2]{开方公式}，其中\quad 表示添加空格。 例如：

<pre>$ x_{ij}^2\quad \sqrt{x}\quad \sqrt[3]{x} $</pre>

$ x_{ij}^2\quad \sqrt{x}\quad \sqrt[3]{x} $

##### 分数

分数用\frac 表示。

字号工具环境设置：

\dfrac 命令把字号设置为独立公式中的大小；

\tfrac 则把字号设置为行间公式中的大小。

    \frac{1}{2} \dfrac{1}{2} $

$$ \frac{1}{2} \dfrac{1}{2} $$

    $$ \frac{1}{2} \tfrac{1}{2} $$

$$ \frac{1}{2} \tfrac{1}{2} $$

##### 运算符

\+ \- \* \/ \= 直接输入；

特殊运算则用以下特殊命令\pm\; \times\; \div\; \cdot\; \cap\; \cup\; \geq\; \leq\; \neq\; \approx\; \equiv

$$ \pm \times \div \cdot \cap \cup \geq \leq \neq \approx \equiv $$

和、积、极限、积分等运算符用\sum, \prod, \lim, \int,这些公式在行内公式被压缩，以适应行高，可以通过\limits 和\nolimits 命令显示制动是否压缩。
\sum\; \prod\; \lim\; \int\;

$$ \sum, \prod, \lim, \int, $$

$$ \sum_{i=1}^n i $$

$$ \prod_{i=1}^n $$

$$\lim_{x\to0}x^2 $$

$$\int_{a}^{b}x^2 dx $$

$$\sum_{i=1}^n i \quad\prod_{i=1}^n \quad\ lim_{x\to0}x^2 \quad\ int_{a}^{b}x^2 dx $$

##### 多重积分

使用如下形式：\int、\iint、\iiint、\iiiint、\idotsint

        $$ \int \int \int \int \quad \int \dots \int $$
        $$ \iint \quad \iiint \quad \iiiint \quad \idotsint $$

$ \int \int \int \int \quad \int \dots \int $

$ \iint \quad \iiint \quad \iiiint \quad \idotsint $

$ \leftarrow $

$ \rightarrow $

$ \leftrightarrow $

$ \longleftarrow $

$ \longleftrightarrow $

$ \Longrightarrow $

\xleftarrow 和\xrightarrow 可根据内容自动调整

##### 注音和标注

    \bar{x} $

$$ \bar{x} $$

    \acute{x} $

$$ \acute{x} $$

    \mathring{x} $

$$ \mathring{x} $$

    \vec{x} $

$$ \vec{x} $$

    \grave{x} $

$$ \grave{x} $$

    \dot{x} $

$$ \dot{x} $$

    \hat{x} $

$$ \hat{x} $$

    \tilde{x} $

$$ \tilde{x} $$

    \ddot{x} $

$$ \ddot{x} $$

    \check{x} $

$$ \check{x} $$

    \breve{x} $

$$ \breve{x} $$

    \dddot{x} $

$$ \dddot{x} $$

##### 分隔符

括号用() [] {} \lange \rangle 表示 () [] {} ⟨⟩

    \overline{xxx}$

$$\overline{xxx}$$

    $\overleftrightarrow{xxx}$

$$\overleftrightarrow{xxx}$$

    $\underline{xxx}$

$$\underline{xxx}$$

    $\underleftrightarrow{xxx}$

$$\underleftrightarrow{xxx}$$

    $\overleftarrow{xxx}$

$$\overleftarrow{xxx}$$

    $\overbrace{xxx}$

$$\overbrace{xxx}$$

    $\underleftarrow{xxx}$

$$\underleftarrow{xxx}$$

    $\underbrace{xxx}$

$$\underbrace{xxx}$$

    $\overrightarrow{xxx}$

$$\overrightarrow{xxx}$$

    $\widehat{xxx}$

$$\widehat{xxx}$$

    $\underrightarrow{xxx}$

$$\underrightarrow{xxx}$$

    $\widetilde{xxx}$

$$\widetilde{xxx}$$

    $$
        \Bigg( \bigg( \Big( \big((x) \big) \Big) \bigg) \Bigg)

        \quad

        \Bigg[ \bigg[ \Big[ \big[[x] \big] \Big] \bigg] \Bigg]

        \quad

        \Bigg\{ \bigg\{ \Big\{ \big\{\{x\} \big\} \Big\} \bigg\} \Bigg\}
    $$

$$
\Bigg( \bigg( \Big( \big((x) \big) \Big) \bigg) \Bigg)

\quad

\Bigg[ \bigg[ \Big[ \big[[x] \big] \Big] \bigg] \Bigg]

\quad

\Bigg\{ \bigg\{ \Big\{ \big\{\{x\} \big\} \Big\} \bigg\} \Bigg\}
$$

    $$
    \Bigg\langle \bigg\langle \Big\langle \big\langle\langle x \rangle \big\rangle \Big\rangle \bigg\rangle \Bigg\rangle

    \quad

    \Bigg\lvert \bigg\lvert \Big\lvert \big\lvert\lvert x \rvert \big\rvert \Big\rvert \bigg\rvert \Bigg\rvert

    \quad

    \Bigg\lVert \big \lVert \Big\lVert \big\lVert \lVert x \rVert \big\rVert \Big\rVert \bigg\rVert \Bigg\rVert
    $$

$$
\Bigg\langle \bigg\langle \Big\langle \big\langle\langle x \rangle \big\rangle \Big\rangle \bigg\rangle \Bigg\rangle

\quad

\Bigg\lvert \bigg\lvert \Big\lvert \big\lvert\lvert x \rvert \big\rvert \Big\rvert \bigg\rvert \Bigg\rvert

\quad

\Bigg\lVert \big \lVert \Big\lVert \big\lVert \lVert x \rVert \big\rVert \Big\rVert \bigg\rVert \Bigg\rVert
$$

##### 省略号

省略号用 \dots \cdots \vdots \ddots 表示 ，\dots 和\cdots 的纵向位置不同，前者一般用于有下标的序列

    $$ x_1, x_2, \dots, x_n\quad 1,2,\cdots,n\quad \vdots\quad \ddots $$

$$ x_1, x_2, \dots, x_n\quad 1,2,\cdots,n\quad \vdots\quad \ddots $$

##### 空白间距

| 语法           | 格式       | 显示           |
| :------------- | :--------- | :------------- |
| quad 空格      | a \quad b  | 一个 m 的宽度  |
| 两个 quad 空格 | a \qquad b | 两个 m 的宽度  |
| 大空格         | a \: b     | 1/3m 宽度      |
| 中等空格       | a \; b     | 2/7m 宽度      |
| 小空格         | a \, b     | 1/6m 宽度      |
| 没有空格       | ab         | 没有空格       |
| 缩进空格       | a \! b     | 缩进 1/6m 宽度 |

##### 三角运算符

| 名称    | 数学表达式 | markdown 公式 |
| :------ | :--------- | :------------ |
| 垂直    | \bot       | $\bot$        |
| 角      | \angle     | $\angle$      |
| 30 度角 | 30^\circ   | $30^\circ$    |
| 正弦    | \sin       | $\sin$        |
| 余弦    | \cos       | $\cos$        |
| 正切    | \tan       | $\tan$        |

##### 对数运算符

| 名称 | 数学表达式 | markdown 公式 |
| :--- | :--------- | :------------ |
| 对数 | \log       | $\log$        |
| 对数 | \log_2{18} | $\log_2{18}$  |
| 对数 | \ln        | $\ln$         |

##### 集合运算符

| 名称     | 数学表达式  | markdown 公式 |
| :------- | :---------- | :------------ |
| 包含于   | \subset     | $\subset$     |
| 真包含于 | \subsetneqq | $\subsetneqq$ |
| 包含     | \supset     |               | $\supset$ |
| 真包含   | \supsetneqq | $\supsetneqq$ |
| 不包含   | \not\supset | $\not\supset$ |
| 属于     | \in         | $\in$         |
| 相交     | \cap        | $\cap$        |
| 相并     | \cup        | $\cup$        |
| 空集     | \emptyset   | $\emptyset$   |

##### 关系运算符

名称 数学表达式 markdown 公式
|大于等于| \geq |$\geq$|
|小于等于| \leq| $\leq$
|不等于 |\not=| $\not=$|
|不小于 |\not<| $\not<$|

##### 正无穷、负无穷

\infty
| 名称 | 数学表达式 | markdown 公式 |
| :------- | :---------- | :------------ |
|正无穷| +\infty| $+\infty$|
|负无穷 |-\infty| $-\infty$|

##### 复杂公式

1. 矩阵

$$
\begin{array}{ccc}
x_1 & x_2 &\dots\\
x_3 & x_4 &\dots\\
\vdots&\vdots&\ddots
\end{array}
$$

$$
\begin{pmatrix}
a & b\\
c & d \\
\end{pmatrix}

\quad

\begin{bmatrix}
a & b \\
c & d \\
\end{bmatrix}

\quad

\begin{Bmatrix}
a & b \\
c & d \\
\end{Bmatrix}

\quad

\begin{vmatrix}
a & b \\
c & d \\
\end{vmatrix}

\quad

\begin{Vmatrix}
a & b \\
c & d \\
\end{Vmatrix}
$$

$$
(
\begin{smallmatrix}
a & b \\
c & d
\end{smallmatrix}
)
$$

2. 长公式
   无需对齐可使用 multline；
   需要对齐使用 split；
   用\\来分行；
   用&设置对齐的位置

$$
\begin{multline}
x = a+b+c+{}
    d+e+f+g
\end{multline}
$$

$$
\begin{split}
x = {} & a + b + c +{}\\
       & d + e + f + g
\end{split}
$$

3. 公式组
   不需要对齐的公式组用 gather；
   需要对齐使用 align:

$$
\begin{gather}
a = b+c+d\\
x = y+z\\
\end{gather}
$$

$$
\begin{align}
a &=b+c+d \\
x &=y+z\\
5 &= 4+1
\end{align}
$$

4. 分支公式
   分段函数通常用 cases 次环境携程分支公式

$$
y=\begin{cases}
-x,\quad x\leq 0\\
x, \quad x>0
\end{cases}
$$
