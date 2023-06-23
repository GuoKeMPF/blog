"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class PrivateValue {
  constructor(props) {
    this.id = '11111111111';
    this.hobit = void 0;
    this.value = void 0;
    this.age = void 0;
    const initValue = props.initValue;
    this.value = initValue;
    this.hobit = ['eat', 'sleep'];
    this.age = 18;
  }
  pLog() {
    console.log('id', this.id);
    console.log('hobit', this.hobit);
    console.log('value', this.value);
  }
  logValue() {
    this.pLog();
    // console.log('id', this.id);
    // console.log('hobit', this.hobit);
    // console.log('value', this.value);
  }

  getValue() {
    return this.value;
  }

  /**
   * setValue
   * @param newValue string
   */
  setValue(newValue) {
    this.value = newValue;
  }
}
PrivateValue.id = void 0;
const v1 = new PrivateValue({
  initValue: 'value1'
});
v1.logValue();
console.log(v1.getValue());
// console.log(v1.hobit);
v1.setValue('22222222');
console.log(v1.getValue());
var _default = {};
exports.default = _default;