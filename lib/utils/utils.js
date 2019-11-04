"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkCode = checkCode;

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkCode(data) {
  var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!data) {
    _message2.default.error('服务器错误');

    return false;
  }

  var errcode = data.errcode,
      errmsg = data.errmsg;

  if (errcode != 0) {
    _message2.default.error(errmsg);

    return false;
  }

  if (flag) {
    _message2.default.success(errmsg);
  }

  return true;
}