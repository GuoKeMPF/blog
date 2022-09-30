"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ggEditor = require("gg-editor");

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _index = _interopRequireDefault(require("./index.less"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FlowContextMenu = function FlowContextMenu() {
  return /*#__PURE__*/_react.default.createElement(_ggEditor.ContextMenu, {
    className: _index.default.contextMenu
  }, /*#__PURE__*/_react.default.createElement(_ggEditor.NodeMenu, null, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "copy"
  }), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "delete"
  })), /*#__PURE__*/_react.default.createElement(_ggEditor.EdgeMenu, null, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "delete"
  })), /*#__PURE__*/_react.default.createElement(_ggEditor.GroupMenu, null, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "copy"
  }), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "delete"
  }), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "unGroup",
    icon: "ungroup",
    text: "Ungroup"
  })), /*#__PURE__*/_react.default.createElement(_ggEditor.MultiMenu, null, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "copy"
  }), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "paste"
  }), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "addGroup",
    icon: "group",
    text: "Add Group"
  }), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "delete"
  })), /*#__PURE__*/_react.default.createElement(_ggEditor.CanvasMenu, null, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "undo"
  }), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "redo"
  }), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    command: "pasteHere",
    icon: "paste",
    text: "Paste Here"
  })));
};

var _default = FlowContextMenu;
exports.default = _default;