type Person = {
  name: string;
  age: number;
  sex: '男' | '女';
  say: (word: string) => void;
};

const xiaoming: Person = {
  name: '小明',
  age: 18,
  sex: '女',
  say: function(p) {
    console.log(`${this.name} say ${p}`);
    return `${this.name} say ${p}`;
  },
};

type Student = {
  school: string;
  className: string;
};

const class1: Student = {
  school: '一中',
  className: '三年级二班',
};

const student_xiaoming: Student & Person = {
  ...xiaoming,
  ...class1,
};


export default
