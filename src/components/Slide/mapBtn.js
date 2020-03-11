import React from 'react';
import { Icon } from "antd";

const MapBtn = props => {
  return (
    <div className="slide-btn" onClick={() => props.onClick()}>
      <Icon type="global" />
    </div>
  )
}

export default MapBtn;