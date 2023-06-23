"use strict";

function* generator1() {
  let count = 0;
  while (count < 5) {
    yield count;
    count++;
  }
  return;
}
const iterable1 = generator1();
console.log(iterable1.next());
console.log(iterable1.next());
console.log(iterable1.next());
console.log(iterable1.next());
console.log(iterable1.next());
console.log(iterable1.next());
function* generation2(i) {
  const x = i;
  console.log("x", x);
  const y = yield x + 1;
  console.log("y", y);
  const z = yield y + 1;
  console.log("z", z);
  return x + y + z;
}

// const iterable2 = generation2(0);
// console.log(iterable2.next());
// console.log(iterable2.next());
// console.log(iterable2.next());

const iterable3 = generation2(0);
console.log(iterable3.next());
console.log(iterable3.next(5));
console.log(iterable3.next(8));