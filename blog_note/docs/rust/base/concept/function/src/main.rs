// fn main() {
//     println!("main function");
//     another_function(1);
// }

// fn another_function(params: i32) {
//     println!("params is {}", params);
//     println!("another function");
// }

// fn main() {
//   let x = doubles(2);
//   println!("x is {}", x);
// }

// fn doubles(x: i32) -> i32 {
//     return x * 2
// }

// fn main() {
//     let x = 5;
//     let y = {
//         let x = 1;
//         x + 3;
//     }; // 返回空元组
//     println!("x is {}, y is {}", x, y);
// }

fn main() {
    let x = doubles(2);
    println!("x is {}", x);
}

fn doubles(x: i32) -> i32 {
    x * 2 // 不可以添加 ;
}
