


/**
 * for (语句 1; 语句 2; 语句 3)
 * {
 *      被执行的代码块
 *  }
 * 语句 1 （代码块）开始前执行
 * 语句 2 定义运行循环（代码块）的条件
 * 语句 3 在循环（代码块）已被执行之后执行
 * 语句1，语句3 可以为空，但是需要定义 语句2 终止循环的操作
 */
function loopFor(list) {
    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        console.log(element);
    }
}

function loopForIn(list) {
    for (const key in list) {
        console.log(list[key]);
    }
}


function loopWhile(list) {
    let index = 0
    while (index < list.length) {
        const element = list[index];
        console.log(element);
        index++
    }
}

function loopDoWhile(list) {
    let index = 0
    do {
        const element = list[index];
        console.log(element);
        index++
    } while (index < list.length);
}


const arr = [1, 2, 3, 4, 5, 6]

arr['id'] = 'arr'
arr[6] = 7
arr['7'] = 8


console.log(arr);

// loopFor(arr)
// loopWhile(arr)
// loopDoWhile(arr)

// loopForIn(arr)

const loopBreak = function (array) {
    for (let index = 0; index < array.length; index++) {
        const value = array[index];
        if (value === 3) {
            break
        }
        console.log(value);
    }
    console.log('finish break loop');
}


const loopContinue = function (array) {
    for (let index = 0; index < array.length; index++) {
        const value = array[index];
        if (value === 3) {
            continue
        }
        console.log(value);
    }
    console.log('finish continue loop');
}

const loopReturn = function (array) {
    for (let index = 0; index < array.length; index++) {
        const value = array[index];
        if (value === 3) {
            return
        }
        console.log(value);
    }
    console.log('finish return loop');
}




loopBreak(arr)
loopContinue(arr)
loopReturn(arr)


