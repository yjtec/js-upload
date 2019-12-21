import React, { Component } from 'react';
import { Button, Upload, Icon, message } from 'antd';
import uuid from 'uuid';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default class MyUpload extends Component {
  state ={
    visible:false,
  }
  constructor(props) {
    super(props);
    const value = props.value || props.defaultValue;
    this.state ={
      value
    }
  }
  componentWillReceiveProps(nextProps){
    if('value' in nextProps){
      this.setState({value:nextProps.value});
    }
  }
  handleChange = ({file,fileList}) => {
    if(file.status === 'uploading'){
      this.setState({
        loading:true
      })
    }

    if(file.status === 'done'){
      this.setState({
        loading:false,
        value:file.response.data
      },()=>{
        this.props.onChange(this.state.value);
      })
    }
    this.setState({fileList:[...fileList]})
  }
  beforeUpload =(file)=> {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
    if (!isJPG) {
      message.error('只能上传.jpg .png图片!');
    }
    return isJPG;
  }
  render() {
    const { path,value } = this.state;
    const {
      buttonText,
      onChange,
      value:filevalue,
      ...rest
    } = this.props;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">{buttonText ? buttonText : '上传'}</div>
      </div>
    );
    return (
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/cmm/upload"
        data={{
          type: path,
          ...this.props.data
        }}
        {...rest}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
        
      >
        {value && value.url ? <img style={{ width: '100px' }} src={value.url} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}