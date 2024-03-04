// fn main() {
//     // s; // s不可用
//     let s = "hello"; // s可用
//                      // 可以对s 进行相关操作
// }
// // s // s不可用

// fn main (){
//   let s mut = String::from("hello");
//   s += " world";
//   s.push_str("!");
//   println!("s = {}", s);
// }

// fn main() {
//   let s1 = String::from("hello");
//   let s2 = s1;
//   println!("s1 = {}, s2 = {}", s1, s2);
// }

// fn main() {
//   let s1 = String::from("hello");
//   let s2 = s1.clone();
//   println!("s1 = {}, s2 = {}", s1, s2);
// }

// fn main(){
//   let x = 5;
//   let y = x;
//   println!("x = {}, y = {}", x, y);
// }

// // 所有权与函数
// fn main(){
//   let s = String::from("hello world");
//   take_ownership(s);

//   let x = 5;
//   makes_copy(x);
//   println!("x = {}", x);
// }

// fn take_ownership(s: String) {
//   // s = "Hello, world!"; // s不可用
//   println!("{}", s);
// }

// fn makes_copy(s: i32) {
//   println!("s = {}", s)
// }

// // 返回值与函数
// fn main() {
//     let s1 = gives_ownership();
//     let s2 = String::from("hello");
//     let s3 = takes_and_gives_back(s2);
//     println!("s1 = {}, s2 = {}, s3 = {}", s1, s2, s3);
// }

// fn gives_ownership() -> String {
//     let s = String::from("hello world");
//     return s;
// }

// fn takes_and_gives_back(s: String) -> String {
//     s
// }

// fn main() {
//     let mut s1 = String::from("hello world");
//     let len = calculate_length(&mut s1);
//     println!("len = {}", len);
// }

// fn calculate_length(s: &mut String) -> usize {
//     s.push_str("!!!");
//     let length = s.len();
//     length
// }

// fn main() {
//     let mut s1 = String::from("hello world");
//     let s2 = &mut s1; // ------- mutable borrow occurs here
//     let s3 = &mut s1;
//     println!("s1 = {}, s2 = {}, s3 = {}", s1, s2, s3);
// }

// fn main() {
//     let reference_to_nothing = dangle();
// }

// fn dangle() -> &String {
//     let s = String::from("hello");
//     &s
// }

fn main() {
    let s = String::from("hello world");
    let first_word = first_word(&s);
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
