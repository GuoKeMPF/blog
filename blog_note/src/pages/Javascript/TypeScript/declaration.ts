const string1 = 'str1';

const string2: String = new String('wwwwww');

const str = `hello word`;

console.log(str);

console.log(string1 == string2);
console.log(string1 === string2);

const array1: string[] = ["1", "2"];
const array2: (string | number)[] = ["1", 2];
const array3: any[] = ["1", 2, true, null, undefined, { a: 'aaa' }, [1, 2, 3]];

const arr1: Array<number> = [1, 2, 3];
const arr2: Array<number | string> = [1, "2", 3];
const arr3: Array<any> = ["1", 2, true, null, undefined, { a: 'aaa' }, [1, 2, 3]];

interface ObjInterface {
    name: string,
    age: number,
    sex: '男' | '女',
    say: (word: string) => void
}

type ObjType = {
    name: string,
    age: number,
    sex: '男' | '女',
    say: (word: string) => void
}

const obj1: ObjType = {
    name: '小明',
    age: 18,
    sex: '女',
    say: function (p) {
        console.log(`${this.name} say ${p}`);
        return `${this.name} say ${p}`
    }
}

obj1.say("11111");

export default {}

