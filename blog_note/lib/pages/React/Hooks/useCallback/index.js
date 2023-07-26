"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _WithCallback = _interopRequireDefault(require("../../../../components/Hooks/useCallback/WithCallback"));
var _WithoutCallback = _interopRequireDefault(require("../../../../components/Hooks/useCallback/WithoutCallback"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var useCallbackConponent = function useCallbackConponent() {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    orientation: "left"
  }, "WithCallback"), /*#__PURE__*/_react.default.createElement(_WithCallback.default, null), /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    orientation: "left"
  }, "WithoutCallback"), /*#__PURE__*/_react.default.createElement(_WithoutCallback.default, null));
};
var _default = useCallbackConponent;
exports.default = _default;