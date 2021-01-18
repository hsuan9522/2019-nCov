import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";
import { DatePicker, Spin, Icon } from "antd";
import "./globalIncrease.scss";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const GlobalIncrease = () => {
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
  const [chartData, setChartData] = useState([]); //每日
  const [chartData2, setChartData2] = useState([]); //累積
  const [tmpChartData, setTmpChartData] = useState([]);
  const [everydayCount, setEverydayCount] = useState([]);
  const [everydayTotal, setEverydayTotal] = useState([]);
  const colors2 = ["#E2C2A4", "#7ECABC", "#E47C67"]; // for 累積
  const colors = ["#7ECABC", "#E2C2A4", "#E47C67"]; // for每日

  useEffect(() => {
    axios
      .get("https://w5q6k.sse.codesandbox.io/api/v1/cumulative")
      .then((res) => {
        let cumData = {};
        let filter = ["Province/State", "Country/Region", "Lat", "Long"];
        res.data.forEach((el) => {
          for (let i in el) {
            if (filter.includes(i)) continue;
            cumData[i] = cumData[i] + parseInt(el[i]) || 0;
          }
        });

        let tmp_T = [];
        for (let i in cumData) {
          const d = new Date(i);
          let mm = d.getUTCMonth() + 1;
          mm = mm.toString().length === 1 ? "0" + mm : mm;
          let dd = i.split("/")[1];
          dd = dd.toString().length === 1 ? "0" + dd : dd;
          tmp_T.push({
            x: dayjs(i).format("YYYY/MM/DD"),
            y: cumData[i],
          });
        }

        setEverydayTotal(tmp_T);
        let tmp_C = tmp_T.map((el, i) => {
          let tmpCount = el.y;
          if (i !== 0) {
            tmpCount -= tmp_T[i - 1].y;
          }
          return {
            x: el.x,
            y: tmpCount,
          };
        });
        setEverydayCount(tmp_C);
      });
  }, []);

  useEffect(() => {
    //一開始還沒有資料，先存進state下面再從state拿出兩個月
    makeChartData();
  }, [everydayCount, everydayTotal]);

  useEffect(() => {
    //時長太長，初始改抓前兩個月
    if (tmpChartData.length>0) {
      const firstday = dayjs(new Date()).subtract(2, 'month').format("YYYY/MM/DD");
      const start = tmpChartData[0].data.findIndex((e) => e.x === firstday);
      //因為csv那邊可能沒那麼快有前一天的資料，最後選擇直接用最後一筆
      const end = tmpChartData[0].data.length - 1;
      
      const count = tmpChartData[0].data.slice(start, end + 1);
      const total = tmpChartData[1].data.slice(start, end + 1);
      makeChartData(count, total);
    }
  }, [tmpChartData]);

  function makeChartData(data1, data2) {
    const data = [
      {
        id: "每日確診人數",
        data: data1 || everydayCount,
      },
    ];
    const data_c = [
      {
        id: "累積總數",
        data: data2 || everydayTotal,
      },
    ];
    const data_all = [
      {
        id: "每日確診人數",
        data: data1 || everydayCount,
      },
      {
        id: "累積總數",
        data: data2 || everydayTotal,
      },
    ];
    setChartData(data);
    setChartData2(data_c);

    if (!data1 && !data2) {
      setTmpChartData(data_all);
    }
  }

  function disableDate(current) {
    return (
      current &&
      (current.valueOf() >
        dayjs(everydayCount[everydayCount.length - 1].x).add(1, "day") ||
        current.valueOf() < new Date("2020/01/20"))
    );
  }

  function dateOnChange(date, chart) {
    if (date[0] === "" && date[1] === "") {
      makeChartData();
    } else {
      let range = [];
      date.forEach((el, i) => {
        range[i] = chart[0].data.findIndex((e) => e.x === el);
      });
      const count = chart[0].data.slice(range[0], range[1] + 1);
      const total = chart[0].data.slice(range[0], range[1] + 1);
      makeChartData(count, total);
    }
  }
  if (everydayCount.length === 0 || everydayTotal.length === 0) {
    return (
      <div>
        <h3 className="h3-title">每日/累積確診人數</h3>
        <div className="loading">
          <Spin indicator={antIcon} />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div style={{ height: "500px" }}>
        <h3 className="h3-title">每日確診人數</h3>
        <div className="date-range">
          <span>查詢區間：</span>
          <RangePicker
            onChange={(date, dateString) =>
              dateOnChange(dateString, tmpChartData)
            }
            disabledDate={disableDate}
            format="YYYY/MM/DD"
          />
        </div>
        <div className="tips">
          *因疫情爆發至目前時間過長，為了使用者體驗，預設顯示最近60天的數據，但一樣可以自行設定至疫情爆發日看折線圖。
        </div>

        <ResponsiveLine
          data={chartData}
          margin={{ top: 5, right: 5, bottom: 50, left: 80 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear" }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: (v) => `${v.replace(/[0-9]{4}\//g, "")}`,
            tickRotation: -45,
          }}
          axisLeft={{
            orient: "left",
            tickRotation: 0,
            legend: "人數",
            legendOffset: -60,
            legendPosition: "middle",
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
          {chartData.map((el, i) => (
            <div key={i} className="legend-wrapper">
              <div className="legend" style={{ backgroundColor: colors[i] }} />
              <span>{el.id}</span>
            </div>
          ))}
        </div>
      </div>
      {
        //因為累積數量過大，所以分兩塊寫
      }
      <div style={{ height: "500px", marginTop: "170px" }}>
        <h3 className="h3-title">累積確診人數</h3>
        <ResponsiveLine
          data={chartData2}
          margin={{ top: 5, right: 5, bottom: 50, left: 80 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear" }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: (v) => `${v.replace(/[0-9]{4}\//g, "")}`,
            tickRotation: -45,
          }}
          axisLeft={{
            orient: "left",
            tickRotation: 0,
            legend: "人數",
            legendOffset: -60,
            legendPosition: "middle",
          }}
          colors={colors2}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          useMesh={true}
          enableSlices="x"
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {chartData2.map((el, i) => (
            <div key={i} className="legend-wrapper">
              <div className="legend" style={{ backgroundColor: colors2[i] }} />
              <span>{el.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default GlobalIncrease;
