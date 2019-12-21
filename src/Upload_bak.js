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
      loading:false,
      file:props.value ? props.value : null,
      path:props.path ? props.path : 'default'
    }
  }
  componentDidMount(){
    this.props.onChange(this.state.file);
  }
  componentDidUpdate(prevProps,prevState){
    if(this.props.value && this.props.value.url && ((prevProps.value && prevProps.value.url != this.props.value.url) || !prevProps.value)){
      this.setState({
        file:this.props.value
      })
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
        file:file.response.data
      },()=>{
        this.props.onChange(this.state.file);
      })
      
      // fileList = fileList.map(item => item.uid === file.uid ? {...item,...file.response.data}:item)
      // this.setState({
      //   loading:false
      // })
      // this.props.onChange(fileList);
    }
    this.setState({fileList:[...fileList]})
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
    const { path,file } = this.state;
    const {
      buttonText,
      value,
      onChange,
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
        {file && file.url ? <img style={{ width: '100px' }} src={file.url} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}