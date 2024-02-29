---
title: hello world
order: 2
---


# Rust 程序

### 编写 Rust 程序

* 程序文件后缀名：`.rs`
* 文件命名规范：`main.rs`，`hello_world.rs`
  文件名小写，多个单词用下划线连接，如：`hello_world.rs`
* 一个项目可以有多个文件，但只能有一个 `main` 函数

```rust
fn main() {
    println!("hello word");
}
```

## 编译与运行Rust程序

* 编译 `rust hello_world.rs`
* 运行:
  * windows下：`./hello_world.exe`
  * linux/mac下：`./hello_world`

代码解析

1. 定义函数 fn main() {}
    * 没有参数，没有返回
2. main函数很特别：它是每一个Rust程序最先运行的代码
3. 打印文本 println!()
    * println! 是Rust macro（宏）
    * 如果是函数的话，就没有!
    * 'hello word' 是字符串，它是println!函数的参数
    * 这行代码以`;`结尾，表示这行语句结束。

编译和运行时单独的两步

* 运行 Rust 程序之前必须先编译，命令为：`rustc 源文件名`

```sh
rustc hello_world.rs
```

* 编译成功后，会生成一个二进制文件，在windows下还会生成一个 .pdb 文件，里面包含调试信息。
* Rust 是一个 ahead-of-time 编译语言，可以先编译程序，再把程序交给别人运行（无需安装 Rust）
* rustc 只适合单个文件，如果要cargo
