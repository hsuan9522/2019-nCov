import React from "react";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";
import { DatePicker } from "antd";
import "./globalIncrease.scss";

const { RangePicker } = DatePicker;

export default class GlobalIncrease extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      everydayTotal: [], //累積總數
      everydayCount: [], //每日人數
      chartData: [],
      tmpChartData: []
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/cases_time_v3/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report_Date_String%20asc&resultOffset=0&resultRecordCount=2000&cacheHint=true"
      )
      .then(res => {
        const everydayTotal = res.data.features.map(el => {
          return {
            x: el.attributes.Report_Date_String,
            y: el.attributes.Total_Confirmed
          };
        });
        const everydayCount = everydayTotal.map((el, i) => {
          let tmpCount = el.y;
          if (i !== 0) {
            tmpCount -= everydayTotal[i - 1].y;
          }
          return {
            x: el.x,
            y: tmpCount
          };
        });
        this.setState({
          everydayTotal: everydayTotal,
          everydayCount: everydayCount
        });
        this.makeChartData();
        this.setState({ tmpChartData: this.state.chartData });
      });
  }
  makeChartData(data1, data2) {
    const data = [
      {
        id: "每日確診人數",
        data: data1 || this.state.everydayCount
      },
      {
        id: "累積總數",
        data: data2 || this.state.everydayTotal
      }
    ];
    this.setState({ chartData: data });
  }

  dateOnChange(date, chart) {
    if (date[0] === "" && date[1] === "") {
      this.makeChartData();
    } else {
      let range = [];
      date.forEach((el, i) => {
        range[i] = chart[0].data.findIndex(e => e.x === el);
      });
      const count = chart[0].data.slice(range[0], range[1] + 1);
      const total = chart[1].data.slice(range[0], range[1] + 1);
      this.makeChartData(count, total);
    }
  }

  disableDate(current) {
    return (
      current &&
      (current.valueOf() > Date.now() ||
        current.valueOf() < new Date("2020/01/20"))
    );
  }

  render() {
    const colors = ["#E2C2A4", "#7ECABC", "#E47C67"];

    return (
      <div>
        <div style={{ height: "500px" }}>
          <h3 className="h3-title">每日/累積確診人數</h3>
          <div className="date-range">
            <span>查詢區間：</span>
            <RangePicker
              onChange={(date, dateString) =>
                this.dateOnChange(dateString, this.state.tmpChartData)
              }
              disabledDate={this.disableDate}
              format="YYYY/MM/DD"
            />
          </div>

          <ResponsiveLine
            data={this.state.chartData}
            margin={{ top: 5, right: 5, bottom: 50, left: 65 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear" }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              format: v => `${v.replace(/[0-9]{4}\//g, "")}`,
              tickRotation: -45
            }}
            axisLeft={{
              orient: "left",
              tickRotation: 0,
              legend: "人數",
              legendOffset: -60,
              legendPosition: "middle"
            }}
            colors={colors}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            useMesh={true}
            enableSlices="x"
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {this.state.chartData.map((el, i) => (
              <div key={i} className="legend-wrapper">
                <div
                  className="legend"
                  style={{ backgroundColor: colors[i] }}
                />
                <span>{el.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
