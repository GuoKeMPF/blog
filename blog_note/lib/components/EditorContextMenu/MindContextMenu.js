"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ggEditor = require("gg-editor");
var _react = _interopRequireDefault(require("react"));
var _MenuItem = _interopRequireDefault(require("./MenuItem"));
var _index = _interopRequireDefault(require("./index.less"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var MindContextMenu = function MindContextMenu() {
  return /*#__PURE__*/_react.default.createElement(_ggEditor.ContextMenu, {
    className: _index.default.contextMenu
  }, /*#__PURE__*/_react.default.createElement(_ggEditor.NodeMenu, null, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "append",
    text: "Topic"
  }), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "appendChild",
    icon: "append-child",
    text: "Subtopic"
  }), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "collapse",
    text: "Fold"
  }), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "expand",
    text: "Unfold"
  }), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "delete"
  })), /*#__PURE__*/_react.default.createElement(_ggEditor.CanvasMenu, null, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "undo"
  }), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "redo"
  })));
};
var _default = MindContextMenu;
exports.default = _default;