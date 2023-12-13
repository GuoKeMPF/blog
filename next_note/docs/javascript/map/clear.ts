type Key = string;
type Value = string;

const map: Map<Key, Value> = new Map();
map.set('a', 'AAAAA').set('b', 'BBBBB');
console.log(map);
// Map(2) { 'a' => 'AAAAA', 'b' => 'BBBBB' }

map.clear();
console.log(map);
// Map(0) {}

map.set('c', 'CCCCC');
console.log(map);
// Map(1) { 'c' => 'CCCCC' }

// export default {};
