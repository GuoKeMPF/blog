"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _antd = require("antd");

var _ggEditor = require("gg-editor");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditorMinimap = function EditorMinimap() {
  return /*#__PURE__*/_react.default.createElement(_antd.Card, {
    type: "inner",
    size: "small",
    title: "Minimap",
    bordered: false
  }, /*#__PURE__*/_react.default.createElement(_ggEditor.Minimap, {
    height: 200
  }));
};

var _default = EditorMinimap;
exports.default = _default;