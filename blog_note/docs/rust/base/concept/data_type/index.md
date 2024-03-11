---
title: 数据类型
order: 6
---

# 数据类型

标量类型和复合类型

Rust 是静态编译语言，在编译时必须知道所有变量的类型

* 基于使用的值，编译器通常能推断出它的具体类型
* 但是，如果可能的类型比较多（例如把 string 转换成整数的 parse 方法），必须添加类型的标注，否则编译会报错。

```rust
let guess:u32 = "42".parse().expect("not a number");
println!("Guess: {}", guess);
```

## 标量类型

* 一个类型代表一个单个的值
* Rust 有四种主要的标量类型
    * 整数类型
    * 浮点类型
    * 布尔类型
    * 字符类型


### 整数类型

整数类型没有小数部分。

类如 u32 就是一无符号（没有正负号）的整数类型，占据32位的空间，精度范围为 $0$ 到 $ 2^{32}-1 $

无符号整型以 u 开头，有符号整型以 i 开头

Rust 的整数类型列表如图

|length|single|unsigned|
|:--:|:--:|:--:|
|8 bit|i8|u8|
|16 bit|i16|u16|
|32 bit|i32|u32|
|64 bit|i64|u64|
|128 bit|i128|u128|
|arch|isize|usize|

每一种都分 i 和 u ，以及固定的位数

有符号范围 $-2^{n-1}$ 到 $2^{n-1}$， 无符号范围 $0$到 $2^n-1$，n 为位数

**isize** 和 **usize**
isize 和 usize 类型的位数由程序运行的计算机的架构所决定，如果是64位计算机，那么就是64位。

使用 isize 和 usize 的主要场景是对某种集合进行索引操作

整数字面值

decimal 十进制数字

hexadecimal 十六进制数字

octal 八进制数字

binary 二进制数字

byte 仅限制 u8 类型的值


|number literals|example|
|:--:|:--|
|decimal|1234567890|
|hexadecimal|0x1234567890|
|octal|0o1234567890|
|binary|0b110101101 |
|byte(u8 only) |b"Hello, world!"|



除了 byte 类型外，所有的饿数值字面值都允许使用类型后缀

例如 57u8 表示一个无符号的 8 位整数，值为 57

如果不确定应该使用哪种类型，可以使用Rust相应的默认类型

整数的默认类型就是 i32;


:::warning{title="整数溢出"}
例如：u8 类型的值范围是 0 到 255，如果赋值 256：
* 调试模式下Rust会检查整数溢出，如果发生溢出，程序在运行时就会 panic
* 发布模式下（-release）编译，Rust 不会检查可能导致 panic 的整数溢出
    * 如果溢出发生，Rust 会执行环绕操作，即从 0 开始计数，-256 变成0，257 变成1
    但是程序不会 panic
:::


### 浮点类型

Rust 有两种基础的浮点类型，也就是含有小数部分的类型

* **f32**，32位，单精度
* **f64**，64位，双精度

Rust 的浮点类型使用 IEEE 754 标准来描述

f64 是默认类型，因为现代 CPU 上 f64 和 f32 的运算速度差不多，而且 f64 的精度更高。

```rust
  let x = 2.0;      // f64
  let y:f32 = 3.0;  // f32
```

### 数值操作

加减乘除余等

```rust
let sum = 5 + 10;
let diff = 9.5 - 6.4;
let product = 3.2 * 4.3;
let quotient = 56.7 / 15.4;
let remainder = 10.0 % 3.0;
```

### 布尔类型

Rust 的布尔类型只有两个值 true 和 false，占用一个字节大小，符号是 bool

```rust

let t = true;
let f:bool = false;

```

### 字符类型

Rust 语言中 char 类型被用来描述语言中最基础的单个字符。

字符类型的字面值使用单引号，占用四个字节大小，是 Unicode 标量值，可以标识比 ASCII 字符更复杂的字符，如拼音，中日韩文字，零长度空白字符，emoji表情等。

u+0000到u+DFFF 和 u+E000到u+10FFFF

Unicode 中并没有“字符”概念，所以从直觉杀昂认为的字符也许和 Rust 中的概念并不相等


```rust

let x = 'z';
let y = 'Z';
let z = '🚀';
println!("x: {}, y: {}, z: {}", x, y, z);

```

## 复合数据类型

符合数据类型可以是将多个值放在一个类型里。

Rust 有两种复合数据类型：

* 元组 Tuple
* 数组

### 元组 Tuple

Tuple 可以将多个类型的多个值放在一个类型里，元组的长度是固定的，一旦定义，就不能改变。**Tuple 中各个元组的类型不必相同**。

#### 创建 Tuple

在小括号里，将值用逗号分开，Tuple 中每个位置都对应一个类型，Tuple 中各个元组的类型不必相同。

```rust
let tup: (i32, f64, bool, &str) = (10, 6.5, true, "Hello");
```

获取 tuple 的元素值

可以使用模式匹配来解构（destructure）一个Tuple来获取元素的值

```rust
let tup: (i32, f64, bool, &str) = (10, 6.5, true, "Hello");
let (x, y, z, n) = tup;
println!("x: {}, y: {}, z: {},n: {}", x, y, z, n)
```

访问 Tuple 的元素

在 tuple 变量使用点标记法，后面接元素的索引号。索引号从0开始。

```rust
    let tup: (i32, f64, bool, &str) = (10, 6.5, true, "Hello")
    println!("{} {} {} {}", tup.0, tup.1, tup.2, tup.3);
```


### 数组

数组也可以将多个值放在一个类型里，**数组中的每一个元素的类型必须相同**，数组的长度是固定的，一旦定义，就不能改变。


#### 声明一个数组

在中括号里，各个值用逗号分开


```rust
let arr: [i32; 5] = [1,2,3,4,5];

let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
```

数组优点

如果想让你的数据存放在 stack 中，而不是在heap堆中，或者想保证固定数量的元素，数组是一个很好的选择。

数组没有 Vector 灵活 Vector的可变长度，但是可以使用 slice 来访问数组的任意部分。

Vector 和数组类似，它由标准库提供
Vector 的可变长度

#### 数组的类型

数组的类型以这种类型表示：[类型; 长度]

```rust
let arr: [i32; 5] = [1,2,3,4,5];
```

#### 另外一种声明数组的方法

如果数组的每一个元素值都相同，那么可以在：

- 在中括号里指定初始值
- 然后是一个`;`
- 最后是数组的长度

```rust
let a = [3;5];
// 相当于 let a = [3,3,3,3,3];
```

#### 访问数组元素

数组是 stack 上分配的单个块的内存，可以使用数组索引来访问数组的元素

```rust
let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let first = months[0];
    let second = months[1];

```


如果访问的索引超出了数组的范围，那么
- 编译会通过
- 运行会报错（runtime 时会 panic）
    * Rust 不会允许其继续访问相应地址的内存，和 C 语言不通，C语言会访问到野指针对应的值









