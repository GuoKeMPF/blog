"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _ggEditor = require("gg-editor");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var upperFirst = function upperFirst(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, function (l) {
    return l.toUpperCase();
  });
};
var Item = _antd.Form.Item;
var Option = _antd.Select.Option;
var inlineFormItemLayout = {
  labelCol: {
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    sm: {
      span: 16
    }
  }
};
var DetailForm = /*#__PURE__*/function (_React$Component) {
  _inherits(DetailForm, _React$Component);
  var _super = _createSuper(DetailForm);
  function DetailForm() {
    var _this;
    _classCallCheck(this, DetailForm);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.handleFieldChange = function (values) {
      var propsAPI = _this.props.propsAPI;
      var getSelected = propsAPI.getSelected,
        executeCommand = propsAPI.executeCommand,
        update = propsAPI.update;
      setTimeout(function () {
        var item = getSelected()[0];
        if (!item) {
          return;
        }
        executeCommand(function () {
          update(item, _objectSpread({}, values));
        });
      }, 0);
    };
    _this.handleInputBlur = function (type) {
      return function (e) {
        e.preventDefault();
        _this.handleFieldChange(_defineProperty({}, type, e.currentTarget.value));
      };
    };
    _this.renderNodeDetail = function () {
      var _this$item$getModel = _this.item.getModel(),
        label = _this$item$getModel.label;
      return /*#__PURE__*/_react.default.createElement(_antd.Form, {
        initialValues: {
          label: label
        }
      }, /*#__PURE__*/_react.default.createElement(Item, _extends({
        label: "Label",
        name: "label"
      }, inlineFormItemLayout), /*#__PURE__*/_react.default.createElement(_antd.Input, {
        onBlur: _this.handleInputBlur('label')
      })));
    };
    _this.renderEdgeDetail = function () {
      var _this$item$getModel2 = _this.item.getModel(),
        _this$item$getModel2$ = _this$item$getModel2.label,
        label = _this$item$getModel2$ === void 0 ? '' : _this$item$getModel2$,
        _this$item$getModel2$2 = _this$item$getModel2.shape,
        shape = _this$item$getModel2$2 === void 0 ? 'flow-smooth' : _this$item$getModel2$2;
      return /*#__PURE__*/_react.default.createElement(_antd.Form, {
        initialValues: {
          label: label,
          shape: shape
        }
      }, /*#__PURE__*/_react.default.createElement(Item, _extends({
        label: "Label",
        name: "label"
      }, inlineFormItemLayout), /*#__PURE__*/_react.default.createElement(_antd.Input, {
        onBlur: _this.handleInputBlur('label')
      })), /*#__PURE__*/_react.default.createElement(Item, _extends({
        label: "Shape",
        name: "shape"
      }, inlineFormItemLayout), /*#__PURE__*/_react.default.createElement(_antd.Select, {
        onChange: function onChange(value) {
          return _this.handleFieldChange({
            shape: value
          });
        }
      }, /*#__PURE__*/_react.default.createElement(Option, {
        value: "flow-smooth"
      }, "Smooth"), /*#__PURE__*/_react.default.createElement(Option, {
        value: "flow-polyline"
      }, "Polyline"), /*#__PURE__*/_react.default.createElement(Option, {
        value: "flow-polyline-round"
      }, "Polyline Round"))));
    };
    _this.renderGroupDetail = function () {
      var _this$item$getModel3 = _this.item.getModel(),
        _this$item$getModel3$ = _this$item$getModel3.label,
        label = _this$item$getModel3$ === void 0 ? '新建分组' : _this$item$getModel3$;
      return /*#__PURE__*/_react.default.createElement(_antd.Form, {
        initialValues: {
          label: label
        }
      }, /*#__PURE__*/_react.default.createElement(Item, _extends({
        label: "Label",
        name: "label"
      }, inlineFormItemLayout), /*#__PURE__*/_react.default.createElement(_antd.Input, {
        onBlur: _this.handleInputBlur('label')
      })));
    };
    return _this;
  }
  _createClass(DetailForm, [{
    key: "item",
    get: function get() {
      var propsAPI = this.props.propsAPI;
      return propsAPI.getSelected()[0];
    }
  }, {
    key: "render",
    value: function render() {
      var type = this.props.type;
      if (!this.item) {
        return null;
      }
      return /*#__PURE__*/_react.default.createElement(_antd.Card, {
        type: "inner",
        size: "small",
        title: upperFirst(type),
        bordered: false
      }, type === 'node' && this.renderNodeDetail(), type === 'edge' && this.renderEdgeDetail(), type === 'group' && this.renderGroupDetail());
    }
  }]);
  return DetailForm;
}(_react.default.Component);
var _default = (0, _ggEditor.withPropsAPI)(DetailForm);
exports.default = _default;