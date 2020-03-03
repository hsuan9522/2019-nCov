import React from "react";
import { Icon } from "antd";

const SlideBtn = (props)=>{
  return (
    <div className="slide-btn" onClick={() => props.onClick()}>
      <Icon type="project" theme="filled" />
    </div>
  ); 
}
export default SlideBtn;

