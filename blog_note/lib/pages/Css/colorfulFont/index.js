"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useCallbackConponent = function useCallbackConponent() {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    orientation: "left"
  }, "\u5F69\u8272\u5B57\u4F53\u989C\u8272"), /*#__PURE__*/_react.default.createElement("p", {
    className: _index.default.colortext
  }, "\u5C0F\u5DF7\u9634\u96E8\u591C\u5FAE\u51C9\uFF0C\u5B64\u821F\u6C5F\u6D77\u5BC4\u4F59\u751F\u3002"));
};

var _default = useCallbackConponent;
exports.default = _default;