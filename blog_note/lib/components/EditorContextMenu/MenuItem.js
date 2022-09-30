"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ggEditor = require("gg-editor");

var _react = _interopRequireDefault(require("react"));

var _IconFont = _interopRequireDefault(require("../IconFont"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upperFirst = function upperFirst(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, function (l) {
    return l.toUpperCase();
  });
};

var MenuItem = function MenuItem(props) {
  var command = props.command,
      icon = props.icon,
      text = props.text;
  return /*#__PURE__*/_react.default.createElement(_ggEditor.Command, {
    name: command
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _index.default.item
  }, /*#__PURE__*/_react.default.createElement(_IconFont.default, {
    type: "icon-".concat(icon || command)
  }), /*#__PURE__*/_react.default.createElement("span", null, text || upperFirst(command))));
};

var _default = MenuItem;
exports.default = _default;