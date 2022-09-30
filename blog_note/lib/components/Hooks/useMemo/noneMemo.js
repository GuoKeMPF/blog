"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _ = require(".");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var NoneMemo = function NoneMemo() {
  var _useContext = (0, _react.useContext)(_.MemoContext),
      red = _useContext.red,
      blue = _useContext.blue,
      yellow = _useContext.yellow;

  var formatTime = function formatTime(value) {
    console.log('NoneMemo');
    var t = new Date(value);
    var y = t.getFullYear();
    var m = t.getMonth() + 1;
    var d = t.getDate();
    var H = t.getHours();
    var M = t.getMinutes();
    var S = t.getSeconds();
    var ms = t.getMilliseconds();
    return "".concat(y, "\u5E74").concat(m, "\u6708").concat(d, "\u65E5 ").concat(H, "\u65F6").concat(M, "\u5206").concat(S, "\u79D2").concat(ms, "\u6BEB\u79D2");
  };

  var updateRed = formatTime(red);
  var updateBlue = formatTime(blue);
  var updateYellow = formatTime(yellow);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Alert, {
    message: "\u4E0D\u4F7F\u7528useMemo",
    description: /*#__PURE__*/_react.default.createElement("p", null, "\u4E0D\u4F7F\u7528useMemo\u60C5\u51B5\u4E0B\u6BCF\u6B21\u66F4\u65B0\u90FD\u4F1A\u628A\u4E09\u4E2A\u66F4\u65B0\u91CD\u65B0\u8BA1\u7B97\u4E00\u4E0B"),
    type: "info"
  }), /*#__PURE__*/_react.default.createElement("p", null, "red update at: ", updateRed), /*#__PURE__*/_react.default.createElement("p", null, "blue update at: ", updateBlue), /*#__PURE__*/_react.default.createElement("p", null, "yellow update at: ", updateYellow));
};

var _default = NoneMemo;
exports.default = _default;