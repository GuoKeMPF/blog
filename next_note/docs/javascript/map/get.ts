const map = new Map();

map.set('a', 'AAAAA');

const a = map.get('a');
console.log(a);
// AAAAA

const b = map.get('b');
console.log(b);
// undefined

export default {};
