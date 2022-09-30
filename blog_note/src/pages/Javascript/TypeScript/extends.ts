declare class PeopleType {
  sex: "man" | "woman";
  birthday: Date;
  name: string;
}

const p1: PeopleType = {
  name: "小明",
  sex: "man",
  birthday: new Date(),
};

declare class StudentType extends PeopleType {
  role: "student";
  class: string;
}

const s1: StudentType = {
  ...p1,
  role: "student",
  class: "3-2",
};

export default {};
