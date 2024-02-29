---
title: 函数
order: 7
---

# 函数

## 函数声明

声明函数使用 fn 关键字，依照惯例，针对函数和变量名，Rust 使用 snake_case 作为命名风格。所有字母都是小写的，单词之间使用下划线分开

```rust
fn main() {
    println!("main function");
    another_function(1);
}

fn another_function(params: i32) {
    println!("params is {}", params);
    println!("another function");
}
```

## 函数的参数

parameters, arguments。

在函数签名里，必须声明每个参数的类型


```rust
fn main() {
    println!("main function");
    another_function(1); // arguments
}

fn another_function(params: i32) { // parameters
    println!("params is {}", params);
    println!("another function");
}
```

## 函数提中的语句与表达式

函数体由一系列语句组成，可选的由一个表达式结束。Rust 是一个基于表达式的语言。语句时执行一些动作的指令，表达式会计算产生一个值。函数的定义也是语句。语句不返回值，所以不能使用let将一个语句赋给另外一个变量

```rust
// let x = (let y = 5) // 非法语句，报错

let y = 5 + 6;
// 5 + 6 是表达式，计算出一个值，赋值给变量y 和 let 关键词一起组成一个语句
```

## 函数返回值

在 -> 符号后面声明函数返回值的类型，但是不可以返回值命名，
在 Rust 里面通常返回值就是函数体里面最后一个表达式的值，如果想提前返回，需要使用return 关键字并指定一个值


```rust
fn main() {
    let x = doubles(2);
    println!("x is {}", x);
}

fn doubles(x: i32) -> i32 {
    x * 2 // 不可以添加 ; 否则变成语句，返回空元组
}

```





















