---
title: 所有权
order: 10
---


# 所有权

所有权是Rust最独特的特性，它让Rust 无需GC（Garbage Collection）就可以保证内存安全。


## 什么是所有权

所有程序都必须管理它们在运行时使用计算机内存的方式。有些语言具有垃圾收集功能，会在程序运行时定期查找不再使用的内存；在其他语言中，程序员必须显式分配和释放内存。

Rust 使用第三种方法：通过所有权系统和编译器检查的一组规则来管理内存。如果违反任何规则，程序将无法编译。所有权的任何功能都不会减慢程序运行的速度。


:::info{title="堆栈和堆"}
栈Stack和堆Heap

许多编程语言并不要求您经常考虑堆栈和堆。但在像 Rust 这样的系统编程语言中，值是在堆栈上还是在堆上会影响语言的行为方式以及为什么必须做出某些决定。本章稍后将描述与堆栈和堆相关的所有权部分，因此这里是准备中的简要说明。

堆栈和堆都是可供代码在运行时使用的内存部分，但它们的结构方式不同。堆栈按照获取值的顺序存储值，并按照相反的顺序删除值。这称为后进先出。想象一叠盘子：当你添加更多盘子时，你把它们放在一堆盘子的顶部，当你需要一个盘子时，你从上面拿一个。从中间或底部添加或删除板也不起作用！添加数据称为压入堆栈，删除数据称为从堆栈弹出。存储在堆栈上的所有数据都必须具有已知的固定大小。编译时大小未知或大小可能更改的数据必须存储在堆上。

堆的组织性较差：当您将数据放入堆上时，您会请求一定量的空间。内存分配器在堆中找到一个足够大的空位，将其标记为正在使用，并返回一个指针，它是该位置的地址。这个过程称为在堆上分配，有时缩写为分配（将值推入堆栈不被视为分配）。因为指向堆的指针是已知的固定大小，所以您可以将指针存储在堆栈上，但是当您需要实际数据时，必须跟随指针。想象一下坐在一家餐馆里。当您进入时，请说出您的团体人数，然后主人会找到一张适合每个人的空桌子并带您前往那里。如果您的团队中有人迟到，他们可以询问您坐在哪里以便找到您。

压入堆栈比在堆上分配更快，因为分配器永远不需要搜索存储新数据的位置；该位置始终位于堆栈的顶部。相比之下，在堆上分配空间需要更多的工作，因为分配器必须首先找到足够大的空间来容纳数据，然后进行簿记，为下一次分配做准备。

访问堆中的数据比访问堆栈中的数据慢，因为您必须遵循指针才能到达那里。如果现代处理器在内存中的跳跃次数更少，那么它们的速度就会更快。继续类比，考虑餐厅的服务员从许多桌子上点菜。在转到下一张桌子之前先在一张桌子上获得所有订单是最有效的。从 A 表中获取订单，然后从 B 表中获取订单，然后再次从 A 中获取订单，然后再次从 B 中获取订单，这将是一个慢得多的过程。出于同样的原因，如果处理器处理靠近其他数据（因为它在堆栈上）而不是较远的数据（因为它可以在堆上）的数据，那么它可以更好地完成工作。

当您的代码调用函数时，传递给函数的值（可能包括指向堆上数据的指针）和函数的局部变量被推送到堆栈上。当函数结束时，这些值将从堆栈中弹出。

跟踪代码的哪些部分正在使用堆上的哪些数据、最大限度地减少堆上的重复数据量以及清理堆上未使用的数据以免耗尽空间，这些都是所有权解决的问题。一旦理解了所有权，您就不需要经常考虑堆栈和堆，但是知道所有权的主要目的是管理堆数据可以帮助解释为什么它会这样工作。
:::





### 栈Stack和堆Heap 保存数据

Stack 按值的接受顺序来存储，按相反的顺序将她们移除（后进先出 last in first out ）

添加数据家坳做压入栈，移除数据叫弹出栈

所有存储在 Stack 上的数据必须拥有已知的固定的大小，编译时大小未知或大小可能更改的数据必须存储在Heap上。

Heap 的组织性较差一些：

当您将数据放入堆上时，您会请求一定量的空间。

内存分配器在堆中找到一个足够大的空位，将其标记为正在使用，并返回一个指针，它是该位置的地址。这个过程称为在堆上分配，有时缩写为分配。

把值压到 Stack 上不叫分配，因为指针是已知固定大小的，可以报指针存放在Stack上，但是当您需要实际数据时，必须使用指针来定位。

把数据压到 Stack 上要比在 Heap 上分配更快，因为分配器永远不需要搜索存储新数据的位置；该位置始终位于Stack的顶部。

在Heap上分配空间要做更多的工作，操作系统首先需要找到一个足够大的空间来存放数据，然后要做好记录方便下次分配。

### 栈Stack和堆Heap 访问数据

访问 Heap 中的数据要比访问 Stack 中的数据慢，因为需要通过指针才能找到 Heap 中的数据

对于现代的处理器来说，由于缓存的远古，如果指令在内存中跳转的次数越少，那么速度越快。

如果数据存放的距离比较近，那么处理器的处理速度就会更快一些( Stack 上)

如果数据之间的距离比较远，那么处理速度就会慢一些( Heap 上)

Heap 上分配大量的空间也是需要时间的

### 函数调用

当代码调用函数时，值传入到函数（也包括指向 Heap的指针）。函数本地的变量被压到 Stack 上，当函数结束后哦，这些值会从 Stack 上弹出。

### 所有权存在的原因

所有权解决的问题

* 跟踪代码的哪些部分正在使用 heap 的哪些数据
* 最小化 heap 上的重复数据
* 清理 heap 上未使用的数据，以免耗尽空间

## 所有权规则

1. 每个值都有一个变量，这个变量是该值的所有者
2. 每个值同事只能有一个所有者
3. 当所有者超出作用域（scope）时，该值将被删除。


### 变量作用域

作用域 scope 就是程序中一个项目的有效范围


```rust
fn main() {
  // s; // s不可用
  let s = "hello"; // s可用
  // 可以对s 进行相关操作
}
// s // s不可用

```

#### String 类型说明所有权

String 类型比标量数据类型更复杂，它在堆上存储数据，而不是在堆栈上。

字符串字面值：程序里手写的字符串值，它是不可变的。

Rust 还有第二种字符串按类型：String

String 在 heap 上分配，能够储存在编译未知数量的文本。

##### 创建 String 类型的值

可以使用 from 函数从字符串字面值创建出 String 类型的值

```rust
let s = String::from("hello");
```


`::` 标识 from 是 String 类型的函数。

这个字符串是可以被修改的

```rust
fn main (){
  let s mut = String::from("hello");
  s += " world";
  s.push_str("!");
  println!("s = {}", s);
}
```

### 内存和分配

字符串字面值，在编译时就知道他的内容了，其文本内容直接别硬编码到最终的可执行文件，速度快，高效，是因为其不可改变性

String 类型的值，为了支持可变性，需要在heap 上分配内存来保存编译时位置的文本内容，操作系统必须在运行时来请求内存，这一步调用 String::from 来实现，当用完 String 后 需要使用某种方式将内存返回给操作系统，这一步在拥有 GC 的语言中，GC 会跟踪并清理不再使用的内存，没有GC，就需亚奥我们去识别何时不再使用，并调用代码将它返回

- 如果忘了做，就会浪费内存
- 如果提前做了，变量就会非法
- 如果做了两次，也是bug。必须分配一次对应一次释放

Rust 采用了不同的方式：对于某个值来说，当拥有它的变量走出作用范围时，内存会被立即自动的交行给操作系统

#### 变量和数据交互的方式

##### drop 函数

##### move 移动

多个变量可以与同一个数据使用一种独特的方式来交互

```rust
let x = 5; // 5
let y = x; // 5
```

整数是已知的固定大小的简单的值，这两个5被压到了 stack 中

String 版本

```rust
let s1 = String::from("hello");
let s2 = s1;
```

* 一个 String 有 3 个部分组成
    * 一个指向存放字符串内容的指针
    * 一个长度
    * 一个容量
* 上面这个写东西存放在 stack 上
* 存放字符串内容部的部分在 heap 上
* 长度 len 就是存放字符串内容所需要的字节数
* 容量 capacity 是指 String 从操作系统总共获得内存的总字节数

![String 结构](./images/trpl04-01.svg)


当把 s1 赋值给 s2 时，String 的数据被复制了一份

在 stack 上复制了一份指针，长度，容量，并没有复制指针所指向的 heap 上的数据

当变量离开作用域时，Rust 会自动调用 drop 函数，并将变量使用的 heap 上的内存释放。

![String 复制](./images/trpl04-02.svg)

当 s1,s2  离开作用域时，它们都会尝试释放相同的内存，就会引起二次释放的bug

为了保证内存安全，Rust 没有尝试复制被分配的内存，Rust 让 s1 失效，当 s1 离开作用域的时候，Rust 不需要释放任何东西

```rust
fn main() {
  let s1 = String::from("hello");
  let s2 = s1;
  println!("s1 = {}, s2 = {}", s1, s2);
}

```

会报错 内容如下

```
error[E0382]: borrow of moved value: `s1`
  --> src\main.rs:20:32
   |
18 |   let s1 = String::from("hello");
   |       -- move occurs because `s1` has type `String`, which does not implement the `Copy` trait
19 |   let s2 = s1;
   |            -- value moved here
```

##### 深拷贝浅拷贝

浅拷贝 shallow copy

深拷贝 deep copy

你也许会将 复制指针长度 内容 容量 是为浅拷贝，但由于 Rust 让 s1 失效，所以用一个新的术语 移动 move

![移动 move](./images/trpl04-04.svg)

:::info
隐含一个设计原则：Rust 不会自动创建数据的深拷贝

就运行时性能而言，任何自动赋值的操作都是廉价的
:::


##### 变量和数据交互的方式 克隆 Clone

如果想对 heap 上的 String 数据进行深拷贝，而不仅仅是 stack 上的数据，可以使用clone方法

```rust
fn main() {
  let s1 = String::from("hello");
  let s2 = s1.clone();
  println!("s1 = {}, s2 = {}", s1, s2);
}
```

![深拷贝 clone](./images/trpl04-03.svg)


##### stack 上的数据 复制

```rust
fn main(){
  let x = 5;
  let y = x;
  println!("x = {}, y = {}", x, y);
}
```

Copy trait, 可以用于像整数这样完全存放在 stack 上面的类型

如果一个类型实现了 Copy trait，那么旧的变量在赋值之后仍然可以用

如果一个类型或者该类型的一部分实现了 Drop trait，那么 Rust 不允许让它再去实现 Copy trait 了

拥有 Copy trait 的类型：

1. 任何简单标量的组合的类型都可以使用Copy的
2. 任何需要分配内存或者某种资源的都不是Copy的
3. 拥有Copy trait的类型:
    * 所有整数，浮点，bool, char类型
    * Tuple 如果有所字段都是 Copy 的




### 所有权与函数

在语义上，将值传递给函数和把值赋值给变量是类似的

* 将值传递给函数将发生移动或者复制

```rust

fn main(){
  let s = String::from("hello world");
  take_ownership(s);

  let x = 5;
  makes_copy(x);
  println!("x = {}", x);
}

fn take_ownership(s: String) {
  // s = "Hello, world!"; // s不可用
  println!("{}", s);
}

fn makes_copy(s: i32) {
  println!("s = {}", s)
}

```


### 返回值和函数

函数在返回值的过程中同样也会发生所有权的转移

```rust

fn main() {
    let s1 = gives_ownership();
    let s2 = String::from("hello");
    let s3 = takes_and_gives_back(s2);
    println!("s1 = {}, s2 = {}, s3 = {}", s1, s2, s3); // s2 报错
}

fn gives_ownership() -> String {
    let s = String::from("hello world");
    return s;
}

fn takes_and_gives_back(s: String) -> String {
    s
}
```

一个变量所有权总是遵循同样的模式

1. 一个值赋给其他变量时会发生移动
2. 一个包含 heap 数据变量在离开作用域时，它的值会被 drop 函数清理，除非数据的所有权移动到另一个变量上了

## 引用与借用


如何让函数使用某个值，但不获得其所有权？

Rust 有一个特性叫做引用 (Reference),

参数的类型时 &String 而不是 String ， & 符号标识引用，允许你引用某些值而不取得其所有权。

![引用](./images/trpl04-05.svg)

```rust
fn main() {
    let s = String::from("hello world");
    let len = calculate_length(&s);
    println!("len = {}", len);
}

fn calculate_length(s: &String) -> usize {
    let length = s.len();
    length
}
```

#### 借用

可以把引用作为函数参数这个行为叫做借用

借用的参数不可修改
```rust
fn main() {
    let s = String::from("hello world");
    let len = calculate_length(&s);
    println!("len = {}", len);
}

fn calculate_length(s: &String) -> (usize) {
    let length = s.len();
    s.push_str("!!!"); // 会报错
    length
}
```

和变量一样，引用默认也是不可变的。

#### 可变引用


```rust
fn main() {
    let mut s1 = String::from("hello world");
    let len = calculate_length(&mut s1);
    println!("len = {}", len);
}

fn calculate_length(s: &mut String) -> usize {
    s.push_str("!!!");
    let length = s.len();
    length
}

```

可变引用有一个重要的限制：在特定作用域内，对于某一块数据，只能有一个可变的引用,这样做的好处是可以在数据编译时防止数据竞争

```rust
fn main() {
    let mut s1 = String::from("hello world");
    let s2 = &mut s1; // ------- mutable borrow occurs here
    let s3 = &mut s1;
    println!("s1 = {}, s2 = {}, s3 = {}", s1, s2, s3);
}

```

以下三种行为会发生数据竞争
* 两个或多个指针同事访问同一个数据
* 至少有一个指针用于写入数据
* 没有任何机制来同步数据访问

可以通过创建新的作用域，来允许非同事的创建多个可变引用


```rust
fn main(){

  let mut s = String::from("hello world");
  // 不在一个作用域内
  {
    let s1 = &mut s;
  }
  let s2 = &mut s;
}

```

不可以同时拥有一个可变引用和一个不可变引用，多个不变的引用是可以的


```rust
fn main(){
  let mut s = String::from("hello world");
  let r1 = &s;
  let r2 = &s;
  let s1 = &mut s; // 报错
  println!("r1 = {}, r2 = {}, s1 = {}", r1, r2, s1);
}
```


#### 悬空引用 Dangling References

在带有指针的语言中，通过释放一些内存同时保留指向该内存的指针，很容易错误地创建悬空指针（引用内存中可能已分配给其他人的位置的指针）

在 Rust 中，编译器保证引用永远不会是悬空引用：如果您引用了某些数据，编译器将确保数据不会在数据引用超出范围之前超出范围。

```rust
fn main() {
    let reference_to_nothing = dangle();
}

fn dangle() -> &String { // expected named lifetime parameter
    let s = String::from("hello");
    &s
}
```

引用的规则

在任何给的的时刻，只能满足下列条件之一

* 一个可变的引用
* 任意数量的不可变引用

引用必须一直有效


### 切片

Rust 的另外一种不支持所有权的数据类型：切片 slice

类如下面这个需求

编写一个函数，该函数接受由空格分隔的单词字符串，并返回在该字符串中找到的第一个单词。如果函数在字符串中没有找到空格，则整个字符串必须是一个单词，因此应返回整个字符串。


```rust
fn main() {
  let s = String::from("hello world");
  let first_word = first_word(&s);
  // 这个方法无法保证时效性
  // s.clear();  // 如果执行这个方法，则first_word 与 s 的值是不一致的。
  println!("first word = {}", first_word);
}
fn first_word(s: &String) -> usize {
  let bytes = s.as_bytes();
  for (i, &item) in bytes.iter().enumerate() {
     if item == b' ' {
      return i;
     }
  }
  return s.len();
}
```

字符串切片

字符串切片是指字符串中一部分内容的引用

形式是 \[begin..end\]

开始索引就是切片起始位置的索引

结束索引是切片终止位置的下一个索引值

end 可省略

```rust

fn main(){
  let s = String::from("hello world");
  let hello = &s[0..5]; // 取 0 - 5
  let world = &s[6..11]; // 或者 &s[6..]
  let whole = &s[0..s.len()]; // &s[..] or &s[0..]
}

```


:::info
字符串切片范围索引必须发生在有效的 utf-8字符串边界内。

如果尝试从一个多字节的字符串种创建字符串切片，程序会报错并退出。
:::

```rust
fn main() {
    let s: String = String::from("hello world");
    let first_word: &str = first_word(&s);
    println!("first word = {}", first_word);
}
fn first_word(s: &String) -> &str {
    let bytes: &[u8] = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[..i];
        }
    }
    return &s[..];
}

```



字符串字面值是切片

字符串字面值被直接存储在二进制程序种

```rust
let s = "hello world";"
```

变量s的类型是&str，它是一个指向二进制程序特定位置的切片

&str 是不可变引用，所以字符串字面值也是不可变的

##### 字符串 slice 作为参数

```rust
fn first_word(s: &String) -> &str {}
```

采用 &str 作为参数类型，这样可以同时接受 String 和 &str 

```rust
fn first_word(s: &str) -> &str {}
```

定义一个获取字符串 slice 而不是 String 引用的函数使得我们的 API 更加通用并且不会丢失任何功能。


```rust
fn main() {
    let s: String = String::from("hello world");
    let first_word: &str = find_first_word(&s[..]);
    println!("first word = {}", first_word);

    let a2: &str = "hello world";

    let first_word_a1: &str = find_first_word(a2);

    println!("first word = {}", first_word_a1);
}
fn find_first_word(s: &str) -> &str {
    let bytes: &[u8] = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[..i];
        }
    }
    return &s[..];
}
```


### 其他类型的切片

字符串 slice，正如想象的那样，是针对字符串的。不过也有更通用的 slice 类型。考虑一下这个数组：


```rust

let a = [1, 2, 3, 4, 5];

let slice = &a[1..3];

assert_eq!(slice, &[2, 3]);

```

这个 slice 的类型是 &[i32]。它跟字符串 slice 的工作方式一样，通过存储第一个集合元素的引用和一个集合总长度。你可以对其他所有集合使用这类 slice。第八章讲到 vector 时会详细讨论这些集合。















