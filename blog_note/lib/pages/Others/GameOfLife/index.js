"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _GameOfLife = _interopRequireDefault(require("../../../components/GameOfLife"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Game = function Game() {
  return /*#__PURE__*/_react.default.createElement(_GameOfLife.default, null);
};
var _default = Game;
exports.default = _default;