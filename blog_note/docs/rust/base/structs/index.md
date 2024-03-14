---
title: 结构体 structs
order: 11
---



# structs

**struct**，或者 **structure**，是一个自定义数据类型，允许包装和命名多个相关的值，从而形成一个有意义的组合。如果你熟悉一门面向对象语言，struct 就像对象中的数据属性。在本章中，我们会对元组和结构体进行比较和对比。

## 结构体的定义和实例化

定义结构体，需要使用 struct 关键字并为整个结构体提供一个名字。结构体的名字需要描述它所组合的数据的意义。接着，在大括号中，定义每一部分数据的名字和类型，我们称为 字段（field）。


```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}
```

一旦定义了结构体后，为了使用它，通过为每个字段指定具体值来创建这个结构体的 实例。创建一个实例需要以结构体的名字开头，接着在大括号中使用 key: value 键 - 值对的形式提供字段，其中 key 是字段的名字，value 是需要存储在字段中的数据值。实例中字段的顺序不需要和它们在结构体中声明的顺序一致。换句话说，结构体的定义就像一个类型的通用模板，而实例则会在这个模板中放入特定数据来创建这个类型的值。

```rust

fn main() {
    let user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };
}

```


为了从结构体中获取某个特定的值，可以使用点号。举个例子，想要用户的邮箱地址，可以用 user1.email。如果结构体的实例是可变的，我们可以使用点号并为对应的字段赋值。示例 5-3 展示了如何改变一个可变的 User 实例中 email 字段的值：



```rust

fn main() {
    let mut user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };

    user1.email = String::from("anotheremail@example.com");
}

```


:::info
一旦 struct 的实例是可变的，那么实例中所有的字段都是可变的。
:::

struct可以作为返回值

```rust
fn main() {
    let user1 = User {
        email: String::from("alice@example.com"),
        active: true,
        sign_in_count: 1,
        username: String::from("alice"),
    };
    let user2 = build_user(String::from("bob@example.com"), String::from("bob"));
}
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: i32,
}
fn build_user(username: String, email: String) -> User {
    User {
        active: true,
        username,         // 使用 `username` 和 `email` 作为参数同名时，可以简写
        email,
        sign_in_count: 1,
    }
}
```

### 结构体更新语法




使用旧实例的大部分值但改变其部分值来创建一个新的结构体实例通常是很有用的。这可以通过 结构体更新语法（struct update syntax）实现。

```rust

fn main() {
    // --snip--
    let user2 = User {
        email: String::from("another@example.com"),
        ..user1   // 将 user1 作为参数传入。
    };
}

```

### Tuple struct

可以定义类似 tuple 的 struct 叫做 tuple struct

tuple struct 整体有个名，但是里面的元素没有名

定义 tuple struct ：使用 struct 关键字，后面是名字，以及里面元素的类型

```rust
struct Color(u8, u8, u8);
struct Point(i32, i32,i32);
let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);
// black 和 origin 不同的类型，不同的tuple struct实例 Color 和 Point。
```

### Unit_Like Struct 没有任何字段

可以定义一个没有任何字段的结构体！它们被称为 类单元结构体（unit-like structs）

```rust
struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
}

```

:::info{title=结构体数据的所有权}

```rust
struct User {
    active: bool,
    username: &str,
    email: &str,
    sign_in_count: u64,
}
```
User 结构体的定义中，使用了自身拥有所有权的 String 类型而不是 &str 字符串 slice 类型。这是一个有意而为之的选择，因为要这个结构体拥有它所有的数据，为此只要整个结构体是有效的话其数据也是有效的。


可以使结构体存储被其他对象拥有的数据的引用，不过这么做的话需要用上 生命周期（lifetimes），这是一个第十章会讨论的 Rust 功能。生命周期确保结构体引用的数据有效性跟结构体本身保持一致。如果你尝试在结构体中存储一个引用而不指定生命周期将是无效的，比如这样：

```rust
struct User {
    active: bool,
    username: &str, // 编译器会抱怨它需要生命周期标识符：
    email: &str,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        active: true,
        username: "someusername123",
        email: "someone@example.com",
        sign_in_count: 1,
    };
}
```
:::

### 结构体示例程序

输入长方形的长度和宽度，然后输出其周长和面积。

```rust

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let dim: Rectangle = Rectangle {
        width: 30,
        height: 50,
    };
    println!("The area of the rectangle is {} square pixels.", area(&dim));
    println!("{:#?}", dim)
}

fn area(rect: &Rectangle) -> u32 {
    rect.width * rect.height
}

```

### 结构体方法

方法（method）与函数类似：它们使用 fn 关键字和名称声明，可以拥有参数和返回值，同时包含在某处调用该方法时会执行的代码。

方法与函数的不同
1. 方法是在 struct （或者 enum，trait）的上下文中定义
2. 方法的第一个参数总是 self，表示该方法被调用的实例。


#### 定义方法


在impl 块里定义方法。方法的第一个参数可以是&self，也可意思hi获得其所有权或者可变借用，和其他参数一样


让我们把前面实现的获取一个 Rectangle 实例作为参数的 area 函数，改写成一个定义于 Rectangle 结构体上的 area 方法。


```rust

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```


:::info{title=方法调用的运算符}

在 C/C++ 语言中，有两个不同的运算符来调用方法：. 直接在对象上调用方法，而 -> 在一个对象的指针上调用方法，这时需要先解引用（dereference）指针。换句话说，如果 object 是一个指针，那么 object->something() 就像 (*object).something() 一样。

Rust 并没有一个与 -> 等效的运算符；相反，Rust 有一个叫 **自动引用和解引用**（automatic referencing and dereferencing）的功能。方法调用是 Rust 中少数几个拥有这种行为的地方。

它是这样工作的：当使用 object.something() 调用方法时，Rust 会自动为 object 添加 &、&mut 或 * 以便使 object 与方法签名匹配。也就是说，这些代码是等价的：

p1.distance(&p2);
(&p1).distance(&p2);
第一行看起来简洁的多。这种自动引用的行为之所以有效，是因为方法有一个明确的接收者———— self 的类型。在给出接收者和方法名的前提下，Rust 可以明确地计算出方法是仅仅读取（&self），做出修改（&mut self）或者是获取所有权（self）。事实上，Rust 对方法接收者的隐式借用让所有权在实践中更友好。
:::


##### 方法额外参数

函数可以传入其他参数


```rust

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    /// 计算面积
    fn area(&self) -> u32 {
        self.width * self.height
    }
    /// 判读是否可以完全包含另外一个长方形
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle {
        width: 25,
        height: 35,
    };
    let rect3 = Rectangle {
        width: 45,
        height: 65,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );

    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect3 hold rect1? {}", rect3.can_hold(&rect1));
}


```

#### 关联函数

所有在 impl 块中定义的函数被称为 关联函数（associated functions），因为它们与 impl 后面命名的类型相关。我们可以定义不以 self 为第一参数的关联函数（因此不是方法），因为它们并不作用于一个结构体的实例。我们已经使用了一个这样的函数：在 String 类型上定义的 String::from 函数。

不是方法的关联函数经常被用作返回一个结构体新实例的构造函数。这些函数的名称通常为 new ，但 new 并不是一个关键字。例如我们可以提供一个叫做 square 关联函数，它接受一个维度参数并且同时作为宽和高，这样可以更轻松的创建一个正方形 Rectangle 而不必指定两次同样的值：





















