"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./index.less"));

var monaco = _interopRequireWildcard(require("monaco-editor"));

var _umi = require("umi");

var _excluded = ["className", "defaultValue", "language", "readOnly", "theme"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Code = function Code(props) {
  var _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      _props$defaultValue = props.defaultValue,
      defaultValue = _props$defaultValue === void 0 ? '' : _props$defaultValue,
      _props$language = props.language,
      language = _props$language === void 0 ? 'javascript' : _props$language,
      _props$readOnly = props.readOnly,
      readOnly = _props$readOnly === void 0 ? false : _props$readOnly,
      _props$theme = props.theme,
      theme = _props$theme === void 0 ? 'vs-dark' : _props$theme,
      config = _objectWithoutProperties(props, _excluded);

  var container = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var node = container.current;
    var editor;

    var initSize = function initSize() {
      if (editor) {
        editor.layout();
      }
    };

    if (node) {
      var econfig = _objectSpread({
        language: language,
        theme: theme
      }, config);

      if (readOnly) {
        econfig.value = defaultValue;
      }

      editor = monaco.editor.create(node, _objectSpread({}, econfig));

      if (!readOnly) {
        editor.setValue(defaultValue);
      }

      window.addEventListener('resize', initSize);
    }

    return function () {
      window.removeEventListener('resize', initSize);
      editor.dispose();
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_index.default.container, " ").concat(className),
    ref: container
  });
}; // export default Code;


var _default = function _default() {
  if ((0, _umi.isBrowser)()) return /*#__PURE__*/_react.default.createElement(Code, null);
  return /*#__PURE__*/_react.default.createElement("p", null, "\u7EC4\u4EF6\u52A8\u6001\u52A0\u8F7D\u4E2D...");
};

exports.default = _default;