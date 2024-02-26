use rand::Rng; //trait
use std::cmp::Ordering;
use std::io; // prelude

fn main() {
    println!("猜数!");
    println!("猜一个数字");

    println!("生成一个数字");
    // 生成一个 [0,101) 的数字
    let secret_number: u32 = rand::thread_rng().gen_range(1, 101);

    // 通过read_line()方法获取用户输入的字符串
    // io::Result Ok, Err
    // 当 err 时执行 expect输出信息

    loop {
        println!("请输入一个数字!");
        let mut guess = String::new();
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
            Ordering::Less => {
                println!("猜小了!");
            }
            Ordering::Greater => {
                println!("猜大了!");
            }
            Ordering::Equal => {
                println!("猜对了!");
                break;
            }
        }
    }
}
