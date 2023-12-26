interface PersonParameters {
  name: string;
  age: number;
  birthday: Date;
}

class Person {
  name: string;
  age: number;
  birthday: Date;
  constructor({ name, age, birthday }: PersonParameters) {
    this.name = name;
    this.age = age;
    this.birthday = birthday;
  }

  sayName = () => {
    console.log(this.name);
  };
}

const p = new Person({
  name: "mark",
  age: 18,
  birthday: new Date(),
});
console.log(p);

interface StudentParameters extends PersonParameters {
  class: string;
}

class Student extends Person {
  class: string;
  role: string;
  constructor(props: StudentParameters) {
    super(props);
    this.role = "student";
    this.class = props.class;
  }

  introduce = () => {
    console.log(this);
  };
}

const s = new Student({
  name: "sean",
  age: 18,
  birthday: new Date(),
  class: "3-2",
});

console.log(s);

s.introduce();

export default {};
