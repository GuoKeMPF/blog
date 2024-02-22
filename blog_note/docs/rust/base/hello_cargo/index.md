---
title: hello cargo
order: 3
---


# cargo

**cargo** 是 Rust 的构建系统和包管理工具，用于构建代码，下载依赖库，构建依赖库以及发布包。安装 Rust 的时候会安装 cargo。

## 使用cargo创建项目

* 创建项目：`cargo new <project-name>`

  * 项目名称与`<project-name>`同名
  * 会创建一个名为`<project-name>`的目录
  * 目录下包含一个`src`目录
  * `src`目录下包含一个`main.rs`文件，文件中包含一个`fn main() {}`函数，源代码都应该在其中。
  * 项目目录下包含一个`Cargo.toml` （Tom's Obvious,Minmal Language）文件，文件中包含项目信息

## Cargo.toml

```toml
[package]                 // 一个标题区域，表示下面内容同是来配置包 （package）的
name = "hello_cargo"                    // 项目名称
version = "0.1.0"                       // 版本号
edition = "2021"                        // 编译版本
author = ["XXXXX <XXXXX@XXXXX.com>"]    // 作者信息
# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]                          // 一个标题区域，表示下面内容同是来配置依赖库（dependencies）

```

## 构建Cargo项目

cargo build 创建可执行文件

第一次运行cargo build，会自动生成 cargo.logk 文件，该文件负责追踪项目依赖的精确版本。

## 构建和运行 cargo 项目

cargo run 编译代码 + 执行结果

## cargo check

cargo check 检查代码，确保能通过编译，但是不产生任何可执行文件

## 为发布构建

cargo build --release

* 编译时会进行优化
  * 代码会运行的更快，但是编译时间更长
* 会在 target/release 目录下生成可执行文件 为不是 tarrget/debug 目录下的可执行文件
