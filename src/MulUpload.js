import React,{Component,Fragment} from 'react';
import {Button,Upload,Icon} from 'antd';
import {checkCode} from './utils/utils';
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
      if(checkCode(file.response)){
        fileList = fileList.map(item => item.uid === file.uid ? {...item,...file.response.data}:item)
      }else{
        fileList = fileList.filter(item => item.uid !== file.uid);
      }

      
      this.setState({
        loading:false
      })
      this.props.onChange(fileList);
    }
    this.setState({fileList:[...fileList]})
  }
  handleRemove = file => {
    const {fileList} = this.state;
    const data = fileList.filter(item => item.uid !== file.uid);
    this.setState({fileList:data});
    this.props.onChange(data);
  }
  render(){
    const {
      loading,
      fileList
    } = this.state;
    const {
      limit,
      ...rest
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
        headers={{
          accept: 'application/json'
        }}
        {...rest}
        onChange={this.handleChange}
        onRemove={this.handleRemove}
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