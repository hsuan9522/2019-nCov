import React from "react";
import { Icon } from "antd";

export default class SlideBtn extends React.Component {
  render() {
    return (
      <div className="slide-btn" onClick={() => this.props.onClick()}>
        <Icon type="project" theme="filled" />
      </div>
    );
  }
}
