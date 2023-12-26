
interface PropsType {
  initValue: string;
}

class PrivateValue {

  static id: string;
  id = '11111111111'
  private hobit: string[];
  private value: string;
  public age: number;

  constructor(props: PropsType) {
    const { initValue } = props;
    this.value = initValue;
    this.hobit = ['eat', 'sleep']
    this.age = 18;
  }

  private pLog() {
    console.log('id', this.id);
    console.log('hobit', this.hobit);
    console.log('value', this.value);
  }

  public logValue() {
    this.pLog()
    // console.log('id', this.id);
    // console.log('hobit', this.hobit);
    // console.log('value', this.value);
  }

  public getValue() {
    return this.value
  }


  /**
   * setValue
   * @param newValue string
   */
  public setValue(newValue: string) {
    this.value = newValue
  }
}

const v1 = new PrivateValue({
  initValue: 'value1'
});

v1.logValue();
console.log(v1.getValue());
// console.log(v1.hobit);
v1.setValue('22222222')
console.log(v1.getValue());



export default {}
