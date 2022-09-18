"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _code = _interopRequireDefault(require("../../../components/code"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Editor = function Editor() {
  return /*#__PURE__*/_react.default.createElement(_code.default, {
    readOnly: false
  });
};

var _default = Editor;
exports.default = _default;