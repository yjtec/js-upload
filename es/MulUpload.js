import "antd/es/upload/style";
import _Upload from "antd/es/upload";
import "antd/es/icon/style";
import _Icon from "antd/es/icon";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component, Fragment } from 'react';
import { checkCode } from './utils/utils';

var MulUpload =
/*#__PURE__*/
function (_Component) {
  _inherits(MulUpload, _Component);

  function MulUpload(props) {
    var _this;

    _classCallCheck(this, MulUpload);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MulUpload).call(this, props));

    _this.handleChange = function (_ref) {
      var file = _ref.file,
          fileList = _ref.fileList;

      if (file.status === 'uploading') {
        _this.setState({
          loading: true
        });
      }

      if (file.status === 'done') {
        if (checkCode(file.response)) {
          fileList = fileList.map(function (item) {
            return item.uid === file.uid ? _objectSpread({}, item, {}, file.response.data) : item;
          });
        } else {
          fileList = fileList.filter(function (item) {
            return item.uid !== file.uid;
          });
        }

        _this.setState({
          loading: false
        });

        _this.props.onChange(fileList);
      }

      _this.setState({
        fileList: _toConsumableArray(fileList)
      });
    };

    _this.handleRemove = function (file) {
      var fileList = _this.state.fileList;
      var data = fileList.filter(function (item) {
        return item.uid !== file.uid;
      });

      _this.setState({
        fileList: data
      });

      _this.props.onChange(data);
    };

    _this.state = {
      loading: false,
      fileList: props.value ? props.value : []
    };
    return _this;
  }

  _createClass(MulUpload, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          loading = _this$state.loading,
          fileList = _this$state.fileList;

      var _this$props = this.props,
          limit = _this$props.limit,
          rest = _objectWithoutProperties(_this$props, ["limit"]);

      var UploadButton = React.createElement(Fragment, null, React.createElement(_Icon, {
        type: loading ? 'loading' : 'plus'
      }), React.createElement("div", {
        className: "ant-upload-text"
      }, "\u4E0A\u4F20"));
      return React.createElement(_Upload, _extends({
        name: "file",
        listType: "picture-card",
        action: "/cmm/upload",
        fileList: fileList,
        data: {
          type: "store_avatar"
        },
        headers: {
          accept: 'application/json'
        }
      }, rest, {
        onChange: this.handleChange,
        onRemove: this.handleRemove
      }), fileList.length >= limit ? null : UploadButton);
    }
  }]);

  return MulUpload;
}(Component);

MulUpload.defaultProps = {
  limit: 1
};
export default MulUpload;