type Key = string;
type Value = string;

const map: Map<Key, Value> = new Map();
map.set('a', 'AAAAA').set('b', 'BBBBB');

console.log(map);

const deleteResultA = map.delete('a');
console.log(map);
console.log(deleteResultA);

const deleteResultC = map.delete('c');
console.log(map);
console.log(deleteResultC);

export default {};
