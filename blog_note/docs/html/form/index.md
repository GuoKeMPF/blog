# form 表单

HTML `<form>` 元素表示文档中的一个区域，此区域包含交互控件，用于向 Web 服务器提交信息。


```html
<form action="" method="get" class="form-example">
  <div class="form-example">
    <label for="name">Enter your name: </label>
    <input type="text" name="name" id="name" required />
  </div>
  <div class="form-example">
    <label for="email">Enter your email: </label>
    <input type="email" name="email" id="email" required />
  </div>
  <div class="form-example">
    <input type="submit" value="Subscribe!" />
  </div>
</form>

```

可以用 `:valid` 和 `:invalid` CSS 伪类来设置 `<form>` 元素的样式，此时样式的表现取决于表单中的 elements 是否有效。


通过 form 属性获取表单元素的 FormData 对象。经过转换获取 form 所有的键值对。

```html
    <form id="form">
      <div>
        <label htmlFor="text">文本</label><input type="text" name="text" id="text" />
      </div>
      <div>
        <label htmlFor="select">选择框</label><select name="select" id="select">
          <option value="">--Please choose an option--</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
      </div>
      <button type="submit" id="submit">Submit</button>
    </form>
```

```javascript
	const button = document.querySelector("#submit");
	button.addEventListener("click", function (event) {
		event.preventDefault();
		const form = document.querySelector("#form");
		const formData = new FormData(form);
    const values = Object.fromEntries(formData);
    console.log(values);
	});
```


<code src="./index.tsx" title="form"></code>


