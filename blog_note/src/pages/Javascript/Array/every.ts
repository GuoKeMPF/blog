const arr = [2, 3, 4];

const res1 = arr.every(item => item > 1);
console.log('res1', res1); //true

const res2 = arr.every(item => item > 2);
console.log('res2', res2); //false
