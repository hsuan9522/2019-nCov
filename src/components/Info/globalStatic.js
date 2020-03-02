import React from "react";
import dayjs from "dayjs";
import { Statistic, Row, Col } from "antd";

export default class globalStatic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = this.props.data;
    return (
      <div>
        <Row type="flex" justify="space-between" className="text-align-center">
          <Col span={8}>
            <Statistic title="確診人數" value={data.confirmedCount} />
          </Col>
          <Col span={8}>
            <Statistic title="治癒人數" value={data.curedCount} />
          </Col>
          <Col span={8}>
            <Statistic title="死亡人數" value={data.deadCount} />
          </Col>
          <Col span={8} offset={16}>
            <div
              className="update-time"
              style={{ marginTop: "10px", textAlign: "center" }}
            >
              更新時間：{dayjs(data.updateTime).format("YYYY/MM/DD HH:MM")}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
