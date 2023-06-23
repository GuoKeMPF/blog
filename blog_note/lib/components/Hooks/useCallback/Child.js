"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Child = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var name = _ref.name,
    _onClick = _ref.onClick;
  var formatTime = function formatTime(value) {
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
  var timer = (0, _react.useMemo)(function () {
    return formatTime(new Date());
  }, [_onClick]);
  _antd.message.info("render child at ".concat(timer));
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, "name ", name), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: function onClick() {
      return _onClick("hello ".concat(new Date().getTime()));
    }
  }, "\u6539\u53D8 name \u503C"));
});
var _default = Child;
exports.default = _default;