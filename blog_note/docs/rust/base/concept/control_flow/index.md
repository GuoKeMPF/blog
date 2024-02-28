---
title: 控制流
order: 9
---

# 控制流

## if 表达式

if 表达式允许根据条件执行不同的代码分支，条件必须是个 bool 类型，if表达式中，与条件相关联的代码叫做分支 arm，可选的，后面可以加上一个 else 表达式。

```rust
fn main(){
  let num = 5;
  if num < 5 {
    println!("num is less than 5");
  } else if num == 5 {
    println!("num is equal to 5");
  } else {
    println!("num is ga than 5");
  }
}

```

如果使用多余一个 else if，那么最好使用match进行重构

```rust
use std::cmp::Ordering;

fn main() {
    let num = 5;
    match num.cmp(&5) {
        Ordering::Equal => println!("num is equal to 5"),
        Ordering::Greater => println!("num is greater than 5"),
        Ordering::Less => println!("num is less than 5"),
    }
}
```

### 在let语句中使用 if

因为 if 是一个表达式，所以可以将它放在let语句中等号的右边

```rust
let condition = true;
let number = if condition { 6 } else { 5 }; // 两个分支的值必须是同类型
println!("number: {}", number)
```


## Rust 寻呼那

### loop 循环

loop 关键字告诉Rust反复的执行一块代码，直到明确的终止。

可以在 loop 循环中使用 break 关键字来告诉程序何时停止循环

```rust


let mut counter = 0;

let result = loop {
  counter += 1;

  if counter == 10 {
      break counter * 2;
  }
};

print!("result: {}", result) // 20
```

### while 循环

while 循环是每次执行循环体之前都判断一次条件。

```rust
let mut num = 3;
while num != 0 {
    println!("num: {}", num);
    num -= 1;
}
```

### for 循环

使用for循环遍历集合

可以使用 while 和 loop 来遍历集合，但是易错且低效

使用for循环跟简介紧凑，它可以针对集合中每一个元素来执行一些代码。

```rust
let arr = [10, 20, 30, 45, 54];
for item in arr.iter() {
    println!("item: {}", item)
}
```

### Range

Range 由标准库提供，指定一个开始数字和结束数字，range 可以生成她们之间的数字（不包含结束数字）

rev 方法实现了反向的 range，从结束数字到开始数字

```rust
for number in (1..4).rev() {
  println!("number: {}", number);
}
```



















