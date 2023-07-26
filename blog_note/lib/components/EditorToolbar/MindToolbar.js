"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _antd = require("antd");
var _ggEditor = require("gg-editor");
var _ToolbarButton = _interopRequireDefault(require("./ToolbarButton"));
var _CommondSave = _interopRequireDefault(require("./CommondSave"));
var _index = _interopRequireDefault(require("./index.less"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var FlowToolbar = function FlowToolbar() {
  return /*#__PURE__*/_react.default.createElement(_ggEditor.Toolbar, {
    className: _index.default.toolbar
  }, /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    command: "undo"
  }), /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    command: "redo"
  }), /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    type: "vertical"
  }), /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    command: "zoomIn",
    icon: "zoom-in",
    text: "Zoom In"
  }), /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    command: "zoomOut",
    icon: "zoom-out",
    text: "Zoom Out"
  }), /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    command: "autoZoom",
    icon: "fit-map",
    text: "Fit Map"
  }), /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    command: "resetZoom",
    icon: "actual-size",
    text: "Actual Size"
  }), /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    type: "vertical"
  }), /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    command: "append",
    text: "Topic"
  }), /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    command: "appendChild",
    icon: "append-child",
    text: "Subtopic"
  }), /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    type: "vertical"
  }), /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    command: "collapse",
    text: "Fold"
  }), /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    command: "expand",
    text: "Unfold"
  }), /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    type: "vertical"
  }), /*#__PURE__*/_react.default.createElement(_CommondSave.default, {
    command: "save",
    text: "save"
  }));
};
var _default = FlowToolbar;
exports.default = _default;