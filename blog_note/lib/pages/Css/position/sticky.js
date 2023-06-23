"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _sticky = _interopRequireDefault(require("./sticky.less"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var useCallbackConponent = function useCallbackConponent() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _sticky.default.contianer
  }, /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    orientation: "left"
  }, "sticky \u5B9A\u4F4D"), /*#__PURE__*/_react.default.createElement("table", {
    className: _sticky.default.table
  }, /*#__PURE__*/_react.default.createElement("thead", {
    className: _sticky.default.theader
  }, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "th1"), /*#__PURE__*/_react.default.createElement("th", null, "th2"), /*#__PURE__*/_react.default.createElement("th", null, "th3"), /*#__PURE__*/_react.default.createElement("th", null, "th4"), /*#__PURE__*/_react.default.createElement("th", null, "th5"))), /*#__PURE__*/_react.default.createElement("tbody", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "td1-1"), /*#__PURE__*/_react.default.createElement("td", null, "td1-2"), /*#__PURE__*/_react.default.createElement("td", null, "td1-3"), /*#__PURE__*/_react.default.createElement("td", null, "td1-4"), /*#__PURE__*/_react.default.createElement("td", null, "td1-5")), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "td2-1"), /*#__PURE__*/_react.default.createElement("td", null, "td2-2"), /*#__PURE__*/_react.default.createElement("td", null, "td3-3"), /*#__PURE__*/_react.default.createElement("td", null, "td4-4"), /*#__PURE__*/_react.default.createElement("td", null, "td5-5")), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "td3-1"), /*#__PURE__*/_react.default.createElement("td", null, "td3-2"), /*#__PURE__*/_react.default.createElement("td", null, "td3-3"), /*#__PURE__*/_react.default.createElement("td", null, "td3-4"), /*#__PURE__*/_react.default.createElement("td", null, "td3-5")), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "td4-1"), /*#__PURE__*/_react.default.createElement("td", null, "td4-2"), /*#__PURE__*/_react.default.createElement("td", null, "td4-3"), /*#__PURE__*/_react.default.createElement("td", null, "td4-4"), /*#__PURE__*/_react.default.createElement("td", null, "td4-5")), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "td5-1"), /*#__PURE__*/_react.default.createElement("td", null, "td5-2"), /*#__PURE__*/_react.default.createElement("td", null, "td5-3"), /*#__PURE__*/_react.default.createElement("td", null, "td5-4"), /*#__PURE__*/_react.default.createElement("td", null, "td5-5"))), /*#__PURE__*/_react.default.createElement("tfoot", {
    className: _sticky.default.tfoot
  }, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "tf1"), /*#__PURE__*/_react.default.createElement("td", null, "tf2"), /*#__PURE__*/_react.default.createElement("td", null, "tf3"), /*#__PURE__*/_react.default.createElement("td", null, "tf4"), /*#__PURE__*/_react.default.createElement("td", null, "tf5")))), /*#__PURE__*/_react.default.createElement("footer", null));
};
var _default = useCallbackConponent;
exports.default = _default;