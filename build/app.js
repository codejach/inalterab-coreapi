"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.get('/', function (_, res) {
  res.status(200).json({
    name: 'name',
    autor: 'autor',
    node: process.version,
    comments: '¡ooorale cabrones¡'
  });
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log("App listening on port ".concat(PORT, " with nodejs version ").concat(process.version));
  console.log('Press Ctrl+C to quit.');
});
var _default = app;
exports["default"] = _default;