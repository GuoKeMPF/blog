"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ggEditor = _interopRequireWildcard(require("gg-editor"));
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var PlotFlow = function PlotFlow() {
  var data = (0, _react.useMemo)(function () {
    return {
      nodes: [{
        type: 'node',
        size: '80*48',
        shape: 'flow-rect',
        color: '#1890FF',
        label: 'root',
        x: 260,
        y: 80,
        id: '89d7caa6',
        index: 0
      }, {
        type: 'node',
        size: '80*48',
        shape: 'flow-rect',
        color: '#1890FF',
        label: 'left',
        x: 150,
        y: 190,
        id: '2b8ac5b6',
        index: 1
      }, {
        type: 'node',
        size: '80*48',
        shape: 'flow-rect',
        color: '#1890FF',
        label: 'right',
        x: 369,
        y: 190,
        id: 'd97f39a4',
        index: 2
      }],
      edges: [{
        source: '89d7caa6',
        sourceAnchor: 2,
        target: '2b8ac5b6',
        targetAnchor: 0,
        id: '04ec4576',
        index: 3
      }, {
        source: '89d7caa6',
        sourceAnchor: 2,
        target: 'd97f39a4',
        targetAnchor: 0,
        id: '773e08a8',
        index: 4
      }]
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_ggEditor.default, null, /*#__PURE__*/_react.default.createElement(_ggEditor.Flow, {
    style: {
      width: 500,
      height: 250
    },
    data: data
  }));
};
var _default = PlotFlow;
exports.default = _default;