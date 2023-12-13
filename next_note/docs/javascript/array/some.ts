const arr = [2, 3, 4];
// 每一项都大于1
const res1 = arr.some(item => item > 3);
console.log('res1', res1); //true
// 每一项都大于2
const res2 = arr.some(item => item > 4);
console.log('res2', res2); //false
