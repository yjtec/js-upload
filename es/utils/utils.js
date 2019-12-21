import "antd/es/message/style";
import _message from "antd/es/message";
export function checkCode(data) {
  var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!data) {
    _message.error('服务器错误');

    return false;
  }

  var errcode = data.errcode,
      errmsg = data.errmsg;

  if (errcode != 0) {
    _message.error(errmsg);

    return false;
  }

  if (flag) {
    _message.success(errmsg);
  }

  return true;
}
export function getBase64(img, callback) {
  var reader = new FileReader();
  reader.addEventListener('load', function () {
    return callback(reader.result);
  });
  reader.readAsDataURL(img);
}