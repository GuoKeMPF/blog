const arr: (string | number)[] = [1, 2, 3, 4, 5, 6];

const arrSplice = arr.splice(1, 2, 'a', 'b');

console.log('arrSplice', arrSplice);
console.log('arr', arr);
