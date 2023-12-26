const fun1: () => void = () => {
  console.log('sss');
};

const fun2: (arr: number[]) => void = arr => {
  console.log(arr.reduce((pre, cur) => pre + cur, 0));
};

const fun3: (arr: number[]) => number = arr => {
  return arr.reduce((pre, cur) => pre + cur, 0);
};

export default {};
