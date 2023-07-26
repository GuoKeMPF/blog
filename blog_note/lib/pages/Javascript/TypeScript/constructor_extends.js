"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Person {
  constructor({
    name,
    age,
    birthday
  }) {
    this.name = void 0;
    this.age = void 0;
    this.birthday = void 0;
    this.sayName = () => {
      console.log(this.name);
    };
    this.name = name;
    this.age = age;
    this.birthday = birthday;
  }
}
const p = new Person({
  name: "mark",
  age: 18,
  birthday: new Date()
});
console.log(p);
class Student extends Person {
  constructor(props) {
    super(props);
    this.class = void 0;
    this.role = void 0;
    this.introduce = () => {
      console.log(this);
    };
    this.role = "student";
    this.class = props.class;
  }
}
const s = new Student({
  name: "sean",
  age: 18,
  birthday: new Date(),
  class: "3-2"
});
console.log(s);
s.introduce();
var _default = {};
exports.default = _default;