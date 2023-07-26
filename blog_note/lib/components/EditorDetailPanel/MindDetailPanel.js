"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ggEditor = require("gg-editor");
var _antd = require("antd");
var _DetailForm = _interopRequireDefault(require("./DetailForm"));
var _index = _interopRequireDefault(require("./index.less"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var MindDetailPanel = function MindDetailPanel() {
  return /*#__PURE__*/_react.default.createElement(_ggEditor.DetailPanel, {
    className: _index.default.detailPanel
  }, /*#__PURE__*/_react.default.createElement(_ggEditor.NodePanel, null, /*#__PURE__*/_react.default.createElement(_DetailForm.default, {
    type: "node"
  })), /*#__PURE__*/_react.default.createElement(_ggEditor.CanvasPanel, null, /*#__PURE__*/_react.default.createElement(_antd.Card, {
    type: "inner",
    size: "small",
    title: "Canvas",
    bordered: false
  })));
};
var _default = MindDetailPanel;
exports.default = _default;