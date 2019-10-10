import React, { Component } from 'react';
import { Button, Upload, Icon, message } from 'antd';
import uuid from 'uuid';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default class MyUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //path:props.value ? props.value.path : '',
      imageUrl:props.value ? props.value.url : '',
    }
    if(props.value){
      props.onChange(props.value.path);
    }
  }
  componentDidMount() {
    if (this.props.path) {
      this.setState({
        path: this.props.path,
      });
    }
  }
  // componentDidUpdate(nextProps){
  //   const {value} = nextProps;
  //   if(value != this.props.value){
  //     if(this.props.value != undefined){
  //       this.setState({
  //         imageUrl: this.props.value.url
  //       })
  //     }
  //   }
    
  // }
  state = {
    loading: false,
    path: 'default',
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
      this.props.onChange(info.file.response.data.path);
    }
  }
  beforeUpload =(file)=> {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
    // const size = this.state.size;
    // console.log(size);
    if (!isJPG) {
      message.error('只能上传.jpg .png图片!');
    }
    // const isLt2M = file.size / 1024 / 1024 < size;
    // if (!isLt2M) {
    //   message.error(`上传图片不得大于${size}M!`);
    // }
    return isJPG;
  }
  render() {
    const { imageUrl, path } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
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
        }}
        headers={{
          'x-ca-nonce':uuid.v4(),
          'x-ca-stage':'test'
        }}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img style={{ width: '100px' }} src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}