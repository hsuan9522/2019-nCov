import React, { useState } from 'react';
import { Icon } from "antd";

const InfoBtn = props =>{
  return (
    <div className="slide-btn" onClick={()=> props.onClick()}>
      <Icon type="info"/>
    </div>
    )
}

export default InfoBtn;