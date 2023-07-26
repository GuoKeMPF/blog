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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var getSection = function getSection(value) {
  var result;
  switch (true) {
    case value > 0:
      result = '正';
      break;
    case value < 0:
      result = '负';
      break;
    case value === 0:
      result = '零';
      break;
    default:
      result = '非数字';
      break;
  }
  return result;
};
var init = function init(initialCount) {
  return {
    count: initialCount,
    section: getSection(initialCount)
  };
};
var reducer = function reducer(state, action) {
  var count;
  var section;
  var type = action.type,
    payload = action.payload;
  var value = payload.value;
  switch (type) {
    case 'add':
      count = value;
      section = getSection(count);
      return {
        count: count,
        section: section
      };
    case 'reduce':
      count = value;
      section = getSection(count);
      return {
        count: count,
        section: section
      };
    case 'reset':
      count = value;
      section = getSection(count);
      return {
        count: count,
        section: section
      };
    default:
      throw new Error('reducer');
  }
};
var useReducerConponent = function useReducerConponent(_ref) {
  var _ref$initialCount = _ref.initialCount,
    initialCount = _ref$initialCount === void 0 ? 0 : _ref$initialCount;
  var _useReducer = (0, _react.useReducer)(reducer, initialCount, init),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    dispatch = _useReducer2[1];
  var addCount = function addCount() {
    dispatch({
      type: 'add',
      payload: {
        value: state.count + 1
      }
    });
  };
  var reduceCount = function reduceCount() {
    dispatch({
      type: 'reduce',
      payload: {
        value: state.count - 1
      }
    });
  };
  var resetCount = function resetCount() {
    dispatch({
      type: 'reset',
      payload: {
        value: 0
      }
    });
  };
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Alert, {
    message: "useReducer",
    type: "info",
    description: /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("p", null, "useState \u7684\u66FF\u4EE3\u65B9\u6848\u3002\u5B83\u63A5\u6536\u4E00\u4E2A\u5F62\u5982 (state, action) => newState \u7684reducer\uFF0C\u5E76\u8FD4\u56DE\u5F53\u524D\u7684 state \u4EE5\u53CA\u4E0E\u5176\u914D\u5957\u7684 dispatch \u65B9\u6CD5\u3002"), /*#__PURE__*/_react.default.createElement("p", null, "useReducer\u76F8\u5BF9\u4E8EuseState\u53EF\u4EE5\u5B8C\u6210\u8D4B\u503C\u524D\u6821\u9A8C\u64CD\u4F5C,\u5BF9\u4E8E\u6709\u4F9D\u8D56\u5173\u7CFB\u7684\u8D4B\u503C\u64CD\u4F5C\u66F4\u52A0\u65B9\u4FBF."))
  }), /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    orientation: "left"
  }, "useReducer"), /*#__PURE__*/_react.default.createElement(_antd.Button.Group, null, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: addCount
  }, "\u52A0\u4E00"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: reduceCount
  }, "\u51CF\u4E00"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: resetCount
  }, "\u91CD\u7F6E")), /*#__PURE__*/_react.default.createElement("p", null, "\u72B6\u6001\u7BA1\u7406\u91CC\u9762\u7684count\u503C: ", /*#__PURE__*/_react.default.createElement("b", null, state.count)), /*#__PURE__*/_react.default.createElement("p", null, "count\u6B63\u8D1F: ", /*#__PURE__*/_react.default.createElement("b", null, state.section)));
};
var _default = useReducerConponent;
exports.default = _default;