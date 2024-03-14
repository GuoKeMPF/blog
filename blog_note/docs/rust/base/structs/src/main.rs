// fn main() {
//     let user1 = User {
//         email: String::from("alice@example.com"),
//         active: true,
//         sign_in_count: 1,
//         username: String::from("alice"),
//     };
//     let user2 = build_user(String::from("bob@example.com"), String::from("bob"));

//     let user3 = User{
//       username: String::from("charlie"),
//       email: String::from("charlie@example.com"),
//       ..user1
//     };
// }

// struct User {
//     active: bool,
//     username: String,
//     email: String,
//     sign_in_count: i32,
// }
// fn build_user(username: String, email: String) -> User {
//     User {
//         active: true,
//         username,
//         email,
//         sign_in_count: 1,
//     }
// }

// #[derive(Debug)]
// struct Rectangle {
//     width: u32,
//     height: u32,
// }

// fn main() {
//     let dim: Rectangle = Rectangle {
//         width: 30,
//         height: 50,
//     };
//     println!("The area of the rectangle is {} square pixels.", area(&dim));
//     println!("{:#?}", dim)
// }

// fn area(rect: &Rectangle) -> u32 {
//     rect.width * rect.height
// }

// #[derive(Debug)]
// struct Rectangle {
//     width: u32,
//     height: u32,
// }

// impl Rectangle {
//     fn area(&self) -> u32 {
//         self.width * self.height
//     }

//     fn can_hold(&self, other: &Rectangle) -> bool {
//         self.width > other.width && self.height > other.height
//     }
// }

// fn main() {
//     let rect1 = Rectangle {
//         width: 30,
//         height: 50,
//     };
//     let rect2 = Rectangle {
//         width: 25,
//         height: 35,
//     };
//     let rect3 = Rectangle {
//         width: 45,
//         height: 65,
//     };

//     println!(
//         "The area of the rectangle is {} square pixels.",
//         rect1.area()
//     );
//     println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
//     println!("Can rect3 hold rect1? {}", rect3.can_hold(&rect1));
// }

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
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}

fn main() {
  let square1 = Rectangle::square(10);
  println!("square: {:#?}", square1)
}
