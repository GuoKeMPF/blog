"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ggEditor = _interopRequireWildcard(require("gg-editor"));

var _antd = require("antd");

var _EditorMinimap = _interopRequireDefault(require("../../../components/EditorMinimap"));

var _EditorContextMenu = require("../../../components/EditorContextMenu");

var _EditorDetailPanel = require("../../../components/EditorDetailPanel");

var _EditorToolbar = require("../../../components/EditorToolbar");

var _mock = _interopRequireDefault(require("./mock.json"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_ggEditor.default.setTrackable(false);

var PlotMind = function PlotMind() {
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_ggEditor.default, {
    className: _index.default.editor
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, {
    className: _index.default.editorHd
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 24
  }, /*#__PURE__*/_react.default.createElement(_EditorToolbar.MindToolbar, null))), /*#__PURE__*/_react.default.createElement(_antd.Row, {
    className: _index.default.editorBd
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 20,
    className: _index.default.editorContent
  }, /*#__PURE__*/_react.default.createElement(_ggEditor.Mind, {
    data: _mock.default,
    className: _index.default.mind
  })), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 4,
    className: _index.default.editorSidebar
  }, /*#__PURE__*/_react.default.createElement(_EditorDetailPanel.MindDetailPanel, null), /*#__PURE__*/_react.default.createElement(_EditorMinimap.default, null))), /*#__PURE__*/_react.default.createElement(_EditorContextMenu.MindContextMenu, null)));
};

var _default = PlotMind;
exports.default = _default;