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

![影子 DOM](./shadowdom.svg '影子 DOM')

**影子宿主（Shadow host）**: 影子 DOM 附加到的常规 DOM 节点。
**影子树（Shadow tree）**: 影子 DOM 内部的 DOM 树。
**影子边界（Shadow boundary）**: 影子 DOM 终止，常规 DOM 开始的地方。
**影子根（Shadow root）**: 影子树的根节点。

你可以用与非影子节点完全相同的方式来影响影子 DOM 中的节点——例如添加子节点和设置属性、使用 element.style.foo 对单个节点进行样式设置，或将整个影子树内的样式添加到一个 `<style>` 元素中。不同之处在于影子 DOM 内的所有代码都不会影响它的外部，从而便于实现封装。

在影子 DOM 向 web 开发者提供之前，浏览器已经使用它来封装元素的内部结构。以 `<video>` 元素举例，它暴露了默认浏览器控件。在 DOM 中你只能看到 `<video>` 元素，但其影子 DOM 中包含了一系列按钮和其它控件。影子 DOM 规范使你能够操纵自定义元素的影子 DOM。

<code src="./CreateShadow/index.tsx" title="创建影子元素"></code>
