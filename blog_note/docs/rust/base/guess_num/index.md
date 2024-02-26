---
title: 猜数游戏
order: 4
---

# 猜数游戏

本实例将涉及到 let match 等方法，相关函数以及外部的crate等

## 游戏目标

* 生成一个1 ~ 100之间的随机数
* 提示玩家输入一个猜测
* 猜完之后，程序会提示猜测是太小了还是太大了
* 玩家如果输入正确则提示恭喜信息
* 如果玩家输入错误，玩家可以继续输入猜测，直到猜对了

## 代码实现


```toml
[package]
name = "guessing_game"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
rand = "^0.7.0" # 需要用到的依赖库

```

```rust
use rand::Rng; // 生成随机数的库
use std::cmp::Ordering; // 用于处理比较值的方法
use std::io; // 命令行用户交互的库

fn main() {
    // 输出游戏信息
    println!("猜数!");
    println!("猜一个数字");
    println!("生成一个数字");
    // 生成一个 [0,101) 的数字
    let secret_number: u32 = rand::thread_rng().gen_range(1, 101);

    loop {
        println!("请输入一个数字!");
        let mut guess = String::new();

        // 通过read_line()方法获取用户输入的字符串
        // io::Result Ok, Err
        // 当 err 时执行 expect输出信息

        io::stdin().read_line(&mut guess).expect("无法读取行");
        // 将 guess 去除空格并转换成数字。
        // 通过 match 来处理输入非数字的情况。并开始重新输入数字。
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
        println!("你输入的数字是:{}", guess);

        // 比较两个值
        match guess.cmp(&secret_number) {
            // 猜错了，则结束本次循环进入下次循环。 
            Ordering::Less => {
                println!("猜小了!");
            }
            Ordering::Greater => {
                println!("猜大了!");
            }
            Ordering::Equal => {
                // 如果猜正确了则跳出循环，结束游戏
                println!("猜对了!");
                break;
            }
        }
    }
}

```
