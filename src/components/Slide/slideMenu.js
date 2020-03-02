import React from "react";
import axios from "axios";
import { Row, Col } from "antd";

import countryName from "../../config/countryName.json";

export default class SlideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryData: []
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&outSR=102100&resultOffset=0&resultRecordCount=250&cacheHint=true"
      )
      .then(res => {
        const tmpData = res.data.features.map(el => {
          return el.attributes;
        });
        this.setState({ countryData: tmpData });
      });
  }
  render() {
    return (
      <div className="slide-menu">
        <h3>數據表</h3>
        <Row className="row-title" type="flex" justify="space-between">
          <Col span={6}>國家</Col>
          <Col className="col" span={4}>
            確診
          </Col>
          <Col className="col" span={4}>
            治癒
          </Col>
          <Col className="col" span={4}>
            死亡
          </Col>
        </Row>
        {this.state.countryData.map(el => {
          return (
            <Row
              className="row"
              key={el.OBJECTID}
              type="flex"
              justify="space-between"
            >
              <Col span={6}>
                {(countryName.find(e => el.Country_Region === e.key) || {})
                  .zh || el.Country_Region}
              </Col>
              <Col className="col" span={4}>
                {el.Confirmed}
              </Col>
              <Col className="col" span={4}>
                {el.Recovered}
              </Col>
              <Col className="col" span={4}>
                {el.Deaths}
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}
