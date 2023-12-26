const arr = [0, 1, 2, [3, 4, [5, 6, [7, [8, 9]]]]];

const res1 = arr.flat();
const res2 = arr.flat(Infinity);

console.log('arr', arr);
console.log('res1', res1);
console.log('res2', res2);
// expected output: [0, 1, 2, 3, 4]
