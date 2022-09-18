"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _icons() {
  const data = require("@ant-design/icons");

  _icons = function _icons() {
    return data;
  };

  return data;
}

const IconFont = (0, _icons().createFromIconfontCN)({
  scriptUrl: '/note/font.js'
});
var _default = IconFont;
exports.default = _default;