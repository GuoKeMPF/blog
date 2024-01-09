# 自定义元素

Web 组件的一个关键特性是创建自定义元素：即由 Web 开发人员定义行为的 HTML 元素，扩展了浏览器中可用的元素集。



## 自定义元素的类型
有两种类型的自定义元素：

1. **自定义内置元素（Customized built-in element）**继承自标准的 HTML 元素，例如 HTMLImageElement 或 HTMLParagraphElement。它们的实现定义了标准元素的行为。
2. **独立自定义元素（Autonomous custom element）**继承自 HTML 元素基类 HTMLElement。必须从头开始实现它们的行为。



### 自定义元素生命周期回调
一旦自定义元素被注册，当页面中的代码以特定方式与你的自定义元素交互时，浏览器将调用你的类的某些方法。通过提供这些方法的实现，规范称之为生命周期回调，你可以运行代码来响应这些事件。

自定义元素生命周期回调包括：

- **connectedCallback()**：每当元素添加到文档中时调用。规范建议开发人员尽可能在此回调中实现自定义元素的设定，而不是在构造函数中实现。
- **disconnectedCallback()**：每当元素从文档中移除时调用。
- **adoptedCallback()**：每当元素被移动到新文档中时调用。
- **attributeChangedCallback()**：在属性更改、添加、移除或替换时调用。有关此回调的更多详细信息，请参见响应属性变化。


### 响应属性变化
与内置元素一样，自定义元素可以使用 HTML 属性来配置元素的行为。为了有效地使用属性，元素必须能够响应属性值的变化。为此，自定义元素需要将以下成员添加到实现自定义元素的类中：

一个名为 observedAttributes 的静态属性。这必须是一个包含元素需要变更通知的所有属性名称的数组。

attributeChangedCallback() 生命周期回调的实现。

attributeChangedCallback() 回调在列在元素的 observedAttributes 属性中的属性被添加、修改、移除或替换时调用。

回调接受三个参数：

1. 发生变化的属性的名称。
2. 属性的旧值。
3. 属性的新值。
例如，下面这个独立自定义元素将观察一个 size 属性，并在它们发生变化时记录旧值和新值：

```js

// 为这个元素创建类
class MyCustomElement extends HTMLElement {
  static observedAttributes = ["size"];
  constructor() {
    super();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`属性 ${name} 已由 ${oldValue} 变更为 ${newValue}。`);
  }
}

customElements.define("my-custom-element", MyCustomElement);
```



### 注册自定义元素

要使自定义元素在页面中可用，请调用 Window.customElements 的 define() 方法。

define() 方法接受以下参数：

1. name
    元素的名称。必须以小写字母开头，包含一个连字符，并符合规范中有效名称的定义中列出的一些其他规则。

2. constructor
    自定义元素的构造函数。

3. options
    仅对于自定义内置元素，这是一个包含单个属性 extends 的对象，该属性是一个字符串，命名了要扩展的内置元素。



<code src="./buildin.tsx" title="自定义内置元素"></code>


<code src="./custom.tsx" title="独立自定义元素"></code>
