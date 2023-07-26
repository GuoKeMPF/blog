"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _antd = require("antd");
var _react = _interopRequireWildcard(require("react"));
var _gameOfLife = _interopRequireDefault(require("./gameOfLife"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var GameOfLifeStates;
(function (_GameOfLifeStates) {})(GameOfLifeStates || (GameOfLifeStates = {}));
var padding = 20,
  lineWeight = 1;
var initVal = [];
var initConfig = {
  xAxis: 30,
  yAxis: 20
};
var GameOfLife = function GameOfLife() {
  var _Form$useForm = _antd.Form.useForm(),
    _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
    form = _Form$useForm2[0];
  var _message$useMessage = _antd.message.useMessage(),
    _message$useMessage2 = _slicedToArray(_message$useMessage, 2),
    messageApi = _message$useMessage2[0],
    contextHolder = _message$useMessage2[1];
  var intervalId = (0, _react.useRef)(0);
  var canvas = (0, _react.useRef)(null);
  var container = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(initConfig),
    _useState2 = _slicedToArray(_useState, 2),
    mapConfig = _useState2[0],
    setMapConfig = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    _useState4 = _slicedToArray(_useState3, 2),
    mapSize = _useState4[0],
    setMapSize = _useState4[1];
  var _useState5 = (0, _react.useState)(function () {
      var map = new Map();
      initVal.forEach(function (i) {
        var x = i.x,
          y = i.y;
        map.set("".concat(x, "-").concat(y), i);
      });
      return map;
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    initMap = _useState6[0],
    setInitMap = _useState6[1];
  var _useState7 = (0, _react.useState)("stoped"),
    _useState8 = _slicedToArray(_useState7, 2),
    status = _useState8[0],
    setStatus = _useState8[1];
  var _useState9 = (0, _react.useState)(0),
    _useState10 = _slicedToArray(_useState9, 2),
    cell = _useState10[0],
    setCell = _useState10[1];
  (0, _react.useEffect)(function () {
    if (container.current && canvas.current) {
      var size = container.current.getBoundingClientRect();
      var w = size.width;
      var c = Math.floor((w - 2 * padding - lineWeight) / mapConfig.xAxis);
      var height = c * mapConfig.yAxis + 2 * padding;
      var width = c * mapConfig.xAxis + 2 * padding + lineWeight;
      canvas.current.width = width + lineWeight;
      canvas.current.height = height + lineWeight;
      setMapConfig(_objectSpread({}, mapConfig));
    }
  }, []);
  (0, _react.useEffect)(function () {
    if (container.current && canvas.current) {
      var size = container.current.getBoundingClientRect();
      var w = size.width;
      var c = Math.floor((w - 2 * padding - lineWeight) / mapConfig.xAxis);
      var height = c * mapConfig.yAxis + 2 * padding;
      var width = c * mapConfig.xAxis + 2 * padding + lineWeight;
      canvas.current.width = width + lineWeight;
      canvas.current.height = height + lineWeight;
      setMapSize({
        width: width,
        height: height
      });
      setCell(c);
    }
  }, [mapConfig]);
  var drawMap = (0, _react.useCallback)(function () {
    var current = canvas.current;
    var ctx = current === null || current === void 0 ? void 0 : current.getContext("2d");
    if (ctx && mapSize) {
      /**
       * bg
       */
      ctx.clearRect(0, 0, mapSize.width, mapSize.height);
      var innerW = mapSize.width - padding,
        innerH = mapSize.height - padding;
      /**
       * line
       */
      for (var r = 0; r <= mapConfig.yAxis; r += 1) {
        ctx.moveTo(padding, cell * r + padding);
        ctx.lineTo(innerW, cell * r + padding);
      }
      for (var c = 0; c <= mapConfig.xAxis; c += 1) {
        ctx.moveTo(cell * c + padding, padding);
        ctx.lineTo(cell * c + padding, innerH);
      }
      ctx.strokeStyle = "#0f000";
      ctx.stroke();
      initMap.forEach(function (i) {
        var x = i.x,
          y = i.y;
        ctx.fillStyle = "#000";
        ctx.fillRect(x * cell + padding, y * cell + padding, cell, cell);
      });
    }
  }, [mapSize, cell, initMap]);
  (0, _react.useEffect)(function () {
    drawMap();
  }, [drawMap, cell, initMap]);
  var start = function start() {
    setStatus("running");
    form.validateFields().then(function (values) {
      setMapConfig(_objectSpread({}, values));
      // 需要判断是否有超出地图的值
      var filtered = new Map();
      initMap.forEach(function (value, key) {
        if (value.x <= values.xAxis && value.y <= values.yAxis) {
          filtered.set(key, value);
        }
      });
      var generationNext = (0, _gameOfLife.default)(values, filtered);
      var id = window.setInterval(function () {
        var nextValues = generationNext();
        if (nextValues.size === 0) {
          messageApi.open({
            type: "error",
            content: "没有任何细胞生存"
          });
          stop();
          return;
        }
        setInitMap(nextValues);
      }, 1000);
      intervalId.current = id;
    }).catch(function (errorInfo) {});
  };
  var stop = function stop() {
    setStatus("stoped");
    clearInterval(intervalId.current);
  };
  var setCurrentCell = function setCurrentCell(e) {
    if (status === "running") {
      return;
    }
    var x = e.clientX - e.target.offsetTop - padding,
      y = e.clientY - e.target.offsetLeft - padding;
    var col = Math.floor(x / cell),
      row = Math.floor(y / cell);
    if (row < 0 || col >= mapConfig.xAxis || col < 0 || row >= mapConfig.yAxis) {
      return;
    }
    var nextMpa = new Map(initMap);
    var key = "".concat(col, "-").concat(row);
    if (nextMpa.has(key)) {
      nextMpa.delete(key);
    } else {
      nextMpa.set(key, {
        x: col,
        y: row
      });
    }
    setInitMap(nextMpa);
    if (nextMpa.size === 0) {
      messageApi.open({
        type: "error",
        content: "没有任何细胞生存"
      });
      stop();
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, contextHolder, /*#__PURE__*/_react.default.createElement("div", {
    ref: container
  }, /*#__PURE__*/_react.default.createElement("canvas", {
    onClick: setCurrentCell,
    ref: canvas
  })), /*#__PURE__*/_react.default.createElement(_antd.Form, {
    layout: "inline",
    form: form,
    initialValues: initConfig
  }, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
    required: true,
    rules: [{
      min: 1,
      type: "number",
      max: 120,
      required: true
    }],
    name: ["yAxis"],
    label: "\u884C"
  }, /*#__PURE__*/_react.default.createElement(_antd.InputNumber, {
    min: 1,
    max: 120
  })), /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
    rules: [{
      min: 1,
      type: "number",
      max: 120,
      required: true
    }],
    required: true,
    name: ["xAxis"],
    label: "\u5217"
  }, /*#__PURE__*/_react.default.createElement(_antd.InputNumber, {
    min: 1,
    max: 80
  })), /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Space, {
    wrap: true
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    htmlType: "submit",
    type: "primary",
    onClick: start
  }, "\u5F00\u59CB"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: stop
  }, "\u6682\u505C")))));
};
var _default = GameOfLife;
exports.default = _default;