# 变量

## 变量与可变性

* 声明变量使用 `let` 关键字
* 默认情况下，变量不可改变 `immutable`

```rust

// let num = 5;
// println!("the value of num is {}", num);
// 报错 cannot assign twice to immutable variable
// num = 6;

// let 后面添加 mut 关键字，表示变量可变
let mut num = 5;
println!("the value of num is {}", num);
num = 6;
```

## 变量与常量

**常量 constant**,常量在绑定值后也是不可变的，但是他与不可变变脸有很多区别：

1. 常量不可以使用 mut，常量永远都是不可以改变的。
2. 常量使用 const 关键字，它的类型必须是被标注的。
3. 常量可以在任何作用域内进行声明，包括全局作用域。
4. 常量可以绑定到常量表达式，无法绑定到函数的调用结果或指在运行时才能计算出的值。


在程序运行期间，常量自其声明的作用域内一直有效。

命名规范：Rust 里常量使用全大写字母，每个单词之间用下划线分开，如 `PI`、`E`、`GOLDEN_RATIO`。

```rust
// 声明常量 MAX_POINTS
// 类型 无符号整数
// 100_000 下划线仅仅标识十进制分割 十万
const MAX_POINTS: u32 = 100_000;
```
## shadowing 隐藏

* 可以使用相的名字声明新的变量，新的变量就会 shadow 之前声明的同名变量
    - 后续的代码中这个变量名代表的是新的变量
* shadow 和 把变量标记为 mut 是不一样的：
    - 如果不使用 let 关键字，那么重新给非 mut 的变量赋值会导致编译时报错
    - 而使用let声明的同名新变量也是不可改变的
    - 与使用乐园声明的同名便按量，它的类型可以和之前不同




```rust
// 声明变量
let x = 5;
// 再次声明的变量x被 shadowed
let x = x+1;
let x = x *2;
println!("the value of x is {}", x);
```

```rust
let spaces = "     ";
let spaces = spaces.len();
println!("{}", spaces);


// mut 类型被改变 导致报错
// let mut spaces = "     ";
// spaces = spaces.len();
// println!("{}", spaces)


```
