---
title: 注释
order: 8
---

# 注释

在 Rust 中，惯用的注释风格以两个斜杠开始注释，并且注释一直持续到行尾。对于超出单行的注释，您需要//在每一行中包含注释，如下所示：

```rust
// This is a single line comment
```

注释也可以放置在包含代码的行的末尾：

```rust
fn main() {
    let lucky_number = 7; // I’m feeling lucky today
}
```
