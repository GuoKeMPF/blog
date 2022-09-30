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

var useFefConponent = function useFefConponent() {
  var input = (0, _react.useRef)(null);

  var updateInput = function updateInput() {
    console.group('input');
    console.log('group');
    console.groupEnd();
    console.dir(input.current);

    if (input && input.current) {
      input.current.value = "inner set ".concat(new Date().getTime());
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: updateInput
  }, "\u66F4\u65B0"), /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    orientation: "left"
  }, "ref"), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    ref: input
  }), /*#__PURE__*/_react.default.createElement("p", null, "\u70B9\u51FB\u6309\u94AE\u66F4\u65B0input\u8F93\u5165\u6846\u5185\u5BB9"));
};

var _default = useFefConponent;
exports.default = _default;