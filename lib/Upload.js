"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/upload/style");

var _upload = _interopRequireDefault(require("antd/es/upload"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _react = _interopRequireWildcard(require("react"));

var _uuid = _interopRequireDefault(require("uuid"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function getBase64(img, callback) {
  var reader = new FileReader();
  reader.addEventListener('load', function () {
    return callback(reader.result);
  });
  reader.readAsDataURL(img);
}

var MyUpload =
/*#__PURE__*/
function (_Component) {
  _inherits(MyUpload, _Component);

  function MyUpload(props) {
    var _this;

    _classCallCheck(this, MyUpload);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MyUpload).call(this, props));
    _this.state = {
      loading: false,
      path: 'default'
    };

    _this.handleChange = function (info) {
      if (info.file.status === 'uploading') {
        _this.setState({
          loading: true
        });

        return;
      }

      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, function (imageUrl) {
          return _this.setState({
            imageUrl: imageUrl,
            loading: false
          });
        });

        _this.props.onChange(info.file.response.data.path);
      }
    };

    _this.beforeUpload = function (file) {
      var isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'; // const size = this.state.size;
      // console.log(size);

      if (!isJPG) {
        _message2.default.error('只能上传.jpg .png图片!');
      } // const isLt2M = file.size / 1024 / 1024 < size;
      // if (!isLt2M) {
      //   message.error(`上传图片不得大于${size}M!`);
      // }


      return isJPG;
    };

    _this.state = {
      //path:props.value ? props.value.path : '',
      imageUrl: props.value ? props.value.url : ''
    };

    if (props.value) {
      props.onChange(props.value.path);
    }

    return _this;
  }

  _createClass(MyUpload, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.path) {
        this.setState({
          path: this.props.path
        });
      }
    } // componentDidUpdate(nextProps){
    //   const {value} = nextProps;
    //   if(value != this.props.value){
    //     if(this.props.value != undefined){
    //       this.setState({
    //         imageUrl: this.props.value.url
    //       })
    //     }
    //   }
    // }

  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          imageUrl = _this$state.imageUrl,
          path = _this$state.path;

      var uploadButton = _react.default.createElement("div", null, _react.default.createElement(_icon.default, {
        type: this.state.loading ? 'loading' : 'plus'
      }), _react.default.createElement("div", {
        className: "ant-upload-text"
      }, "Upload"));

      return _react.default.createElement(_upload.default, {
        name: "file",
        listType: "picture-card",
        className: "avatar-uploader",
        showUploadList: false,
        action: "/cmm/upload",
        data: {
          type: path
        },
        headers: {
          'x-ca-nonce': _uuid.default.v4(),
          'x-ca-stage': 'test'
        },
        beforeUpload: this.beforeUpload,
        onChange: this.handleChange
      }, imageUrl ? _react.default.createElement("img", {
        style: {
          width: '100px'
        },
        src: imageUrl,
        alt: "avatar"
      }) : uploadButton);
    }
  }]);

  return MyUpload;
}(_react.Component);

exports.default = MyUpload;