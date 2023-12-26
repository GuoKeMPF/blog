const arr = [1, 2, 3, 4, 5, 6];

const thisArr = [7, 8, 9];

const thisRes = arr.every(function(item) {
  console.log('this', this);
  return item > 2;
});

const thisRes1 = arr.every(function(item) {
  console.log('this', this);
  return item > 2;
}, thisArr);
