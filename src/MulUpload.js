import React,{Component,Fragment} from 'react';
import {Button,Upload,Icon} from 'antd';
class MulUpload extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      loading:false,
      fileList:props.value ? props.value : []
    }
  }
  handleChange = ({file,fileList}) => {
    if(file.status === 'uploading'){
      this.setState({
        loading:true
      })
    }

    if(file.status === 'done'){
      fileList = fileList.map(item => item.uid === file.uid ? {...item,...file.response.data}:item)
      this.setState({
        loading:false
      })
      this.props.onChange(fileList);
    }
    this.setState({fileList:[...fileList]})
  }
  render(){
    const {
      loading,
      fileList
    } = this.state;
    const {
      limit
    } = this.props;
    const UploadButton = ( 
      <Fragment>
        <Icon type={loading ? 'loading':'plus'} />
        <div className="ant-upload-text">上传</div>
      </Fragment>
    )
    return (
      <Upload
        name="file"
        listType="picture-card"
        action="/cmm/upload"
        fileList={fileList}
        data={{ 
          type:"store_avatar"
        }}
        onChange={this.handleChange}
      >
        {fileList.length >= limit ? null : UploadButton }
      </Upload>
    )
  }
}

MulUpload.defaultProps = {
  limit:1
}

export default MulUpload;