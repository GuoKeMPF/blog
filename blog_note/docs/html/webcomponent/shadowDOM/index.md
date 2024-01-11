---
title: 影子 DOM
order: 1
---



# 影子 DOM

自定义元素的一个重要方面是封装，因为自定义元素从定义上来说是一种可重用功能：它可以被放置在任何网页中，并且期望它能够正常工作。因此，很重要的一点是，**运行在页面中的代码不应该能够通过修改自定义元素的内部实现而意外地破坏它**。影子 DOM（Shadow DOM）允许你将一个 DOM 树附加到一个元素上，并且使该树的内部对于在页面中运行的 JavaScript 和 CSS 是隐藏的。

```html

<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>DOM 示例</title>
  </head>
  <body>
    <section>
      <img src="dinosaur.png" alt="一个红色的霸王龙。" />
      <p>
        这里我们将添加一个到
        <a href="https://www.mozilla.org/">Mozilla 主页</a>的链接
      </p>
    </section>
  </body>
</html>

```

这个片段生成了以下的 DOM 结构（不包括仅包含空格的文本节点）

```
- HTML
    - HEAD
        - META charset="utf-8"
        - TITLE
            - #text: DOM 示例
    - BODY
        - SECTION
            - IMG src="dinosaur.png" alt="一个红色的霸王龙。"
            - P
                - #text: 这里我们将添加一个到
                - A href="https://www.mozilla.org/"
                - #text: Mozilla 主页
                - #text: 的链接

```

影子 DOM 允许将隐藏的 DOM 树附加到常规 DOM 树中的元素上——这个影子 DOM 始于一个影子根，在其之下你可以用与普通 DOM 相同的方式附加任何元素。

## 创建影子元素

![影子 DOM](./shadowdom.svg '影子 DOM')

**影子宿主（Shadow host）**: 影子 DOM 附加到的常规 DOM 节点。
**影子树（Shadow tree）**: 影子 DOM 内部的 DOM 树。
**影子边界（Shadow boundary）**: 影子 DOM 终止，常规 DOM 开始的地方。
**影子根（Shadow root）**: 影子树的根节点。

你可以用与非影子节点完全相同的方式来影响影子 DOM 中的节点——例如添加子节点和设置属性、使用 element.style.foo 对单个节点进行样式设置，或将整个影子树内的样式添加到一个 `<style>` 元素中。不同之处在于影子 DOM 内的所有代码都不会影响它的外部，从而便于实现封装。

在影子 DOM 向 web 开发者提供之前，浏览器已经使用它来封装元素的内部结构。以 `<video>` 元素举例，它暴露了默认浏览器控件。在 DOM 中你只能看到 `<video>` 元素，但其影子 DOM 中包含了一系列按钮和其它控件。影子 DOM 规范使你能够操纵自定义元素的影子 DOM。

<code src="./CreateShadow/index.tsx" title="创建影子元素"></code>

使用正常的 `querySelectorAll` 无法获取影子元素内部的`dom`结构，例如上面点击将span内容替换成大写，两个影子元素不会受到影响

对于 `attachShadow({ mode: 'open' })` 创建的影子元素，可以通过 `dom.shadowRoot` 访问影子元素内部结构

对于`attachShadow({ mode: 'closed' })` ，此时 shadowRoot 返回 null。

:::wroing
不应将这视为一个强大的安全机制，因为它可以被绕过，比如通过在页面中运行的浏览器扩展。这更多地是一个指示页面不应访问影子 DOM 树内部的一种提示。
:::

## 样式

1. 编程式，通过构建一个 CSSStyleSheet 对象并将其附加到影子根。
2. 声明式，通过在一个 `<template>` 元素的声明中添加一个 `<style>` 元素。

在这两种情况下，影子 DOM 树中定义的样式局限在该树内，所以就像页面样式就像不会影响影子 DOM 中的元素一样，影子 DOM 样式也不会影响页面中其它元素的样式。

### 编程式

可构造样式表
要使用可构造样式表为影子 DOM 中的页面元素设置样式，我们可以：

创建一个空的 CSSStyleSheet 对象
使用 CSSStyleSheet.replace() 或 CSSStyleSheet.replaceSync() 设置其内容
通过将其赋给 ShadowRoot.adoptedStyleSheets 来添加到影子根
在 CSSStyleSheet 中定义的规则将局限在影子 DOM 树的内部，以及我们将其分配到的任何其它 DOM 树。


<code code src="./shadowCss/index.tsx" title="影子元素 样式"></code>



## 在编程式和声明式中选择
使用哪种方式取决于你的应用程序和个人喜好。

创建一个 CSSStyleSheet 并通过 adoptedStyleSheets 将其赋给影子根允许你创建单一样式表并将其与多个 DOM 树共享。例如，一个组件库可以创建单个样式表，然后将其与该库的所有自定义元素共享。浏览器将仅解析该样式表。此外，你可以对样式表进行动态更改，并将更改传播到使用表的所有组件。

而当你希望是声明式的、需要较少的样式并且不需要在不同组件之间共享样式的时候，附加 `<style>` 元素的方法则非常适合。


