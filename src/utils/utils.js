import {message} from 'antd';
export function checkCode(data,flag=false){
  if(!data) {
    message.error('服务器错误');
    return false;
  }
  const {errcode,errmsg} = data;
  if(errcode != 0){
    message.error(errmsg);
    return false;
  }

  if(flag){
    message.success(errmsg);
  }
  return true;
}