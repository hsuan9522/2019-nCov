import React from "react";
import { useSelector } from 'react-redux';
import { Row, Col } from "antd";

const SlideMenu = ()=>{
  const countryInfected = useSelector(state => state.countryInfected);

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
      {countryInfected.map(el => {
        return (
          <Row
            className="row"
            key={el.OBJECTID}
            type="flex"
            justify="space-between"
            style={el.code==='TW' ? {color: "darkred"}: {}}
          >
            <Col span={6}>
              {el.zh || el.Country_Region }
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

export default SlideMenu;
