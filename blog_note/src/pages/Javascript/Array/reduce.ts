const arr = [1, 2, 3, 4, 5];

const res = arr.reduce((pre, cur) => (cur > 2 ? pre + cur : pre), 3);

console.log('res', res);
