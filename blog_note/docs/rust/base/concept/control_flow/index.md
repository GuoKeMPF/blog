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
  } if num ===5 {
    println!("num is equal to 5");
  } else {
    println!("num is ga than 5");
  }
}
```

如果使用多余一个 else if，那么最好使用match进行重构















