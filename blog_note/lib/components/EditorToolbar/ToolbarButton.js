"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ggEditor = require("gg-editor");
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _IconFont = _interopRequireDefault(require("../IconFont"));
var _index = _interopRequireDefault(require("./index.less"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var upperFirst = function upperFirst(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, function (l) {
    return l.toUpperCase();
  });
};
var ToolbarButton = function ToolbarButton(props) {
  var command = props.command,
    icon = props.icon,
    text = props.text;
  return /*#__PURE__*/_react.default.createElement(_ggEditor.Command, {
    name: command
  }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: text || upperFirst(command),
    placement: "bottom",
    overlayClassName: _index.default.tooltip
  }, /*#__PURE__*/_react.default.createElement(_IconFont.default, {
    type: "icon-".concat(icon || command)
  })));
};
var _default = ToolbarButton;
exports.default = _default;