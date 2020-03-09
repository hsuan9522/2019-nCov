import React, { useEffect } from "react";
import { Row, Col, Layout } from "antd";
import { useDispatch } from 'react-redux';
import { getCountryVirusData, getCountryInfo } from "./action"

import "./styles.css";
import "antd/dist/antd.css";

import Info from "./components/Info";
import Country from "./components/Country";
import GlobalIncrease from "./components/globalIncrease";
import State from "./components/State";
import Slide from "./components/Slide/";
const { Footer, Content } = Layout;


const App = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getCountryVirusData())
    dispatch(getCountryInfo())
  },[])

  return (
    <div className="App">
      <Layout>
        <Content style={{ marginTop: "20px" }}>
          <Slide />
          <Row type="flex" justify="center">
            <Col span={21}>
              <h2 className="text-align-center">新型冠狀病毒 2019-nCoV</h2>
              <Info />
              <State />
              <Country />
              {/* <GlobalIncrease /> */}
            </Col>
          </Row>
        </Content>
        <Footer style={{ marginTop: "100px" }}>
          <div style={{ textAlign: "center" }}>
            資料來源：
            <a href="https://github.com/BlankerL/DXY-2019-nCoV-Crawler">
              DXY-2019-nCoV-Crawler
            </a>
            / <a href="https://www.gisaid.org/">GISAID</a>
          </div>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
