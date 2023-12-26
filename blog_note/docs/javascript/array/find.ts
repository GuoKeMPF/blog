const arr: { id: number; value: number }[] = [
  {
    id: 1,
    value: 1,
  },
  {
    id: 2,
    value: 2,
  },
  {
    id: 3,
    value: 3,
  },
  {
    id: 4,
    value: 3,
  },
  {
    id: 5,
    value: 2,
  },
  {
    id: 6,
    value: 1,
  },
];

const arrFind = arr.find(item => item.value === 2);

console.log('arrFind', arrFind);
