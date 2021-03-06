import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveBar } from "@nivo/bar";
import { Spin, Icon } from "antd";

const CountryChart = props => {
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
  const data = useSelector(state => state.countryInfected);
  const countryName = useSelector(state => state.countryInfo);
  if (!data || !countryName) return (<div className="loading"><Spin indicator={antIcon} /></div>)
  const limit = 5000;
  const mapTitle = {
    Confirmed: "確診人數",
    Recovered: "治癒人數",
    Deaths: "死亡人數"
  };
  const keys = ["Confirmed", "Recovered", "Deaths"];
  const colors = ["#E2C2A4", "#7ECABC", "#E47C67"];
  const eachHeight = 18.3;
  return (
      <div>
        <h3 className="h3-title">各國人數狀態</h3>
        <div style={{ height: data.filter(el => el.Confirmed < limit).length*eachHeight }}>
          <ResponsiveBar
            layout="horizontal"
            data={data.filter(el => el.Confirmed < limit)}
            keys={keys}
            indexBy="Country_Region"
            margin={{ top: 5, right: 10, bottom: 50, left: 75 }}
            padding={0.3}
            colors={colors}
            axisLeft={{
              format: v =>
                `${(countryName.find(el => el.key === v) || {}).zh || v}`
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "人數",
              legendPosition: "middle",
              legendOffset: 40
            }}
            animate={true}
            labelSkipWidth={16}
            labelSkipHeight={16}
            enableLabel={false}
            tooltip={({ id, value }) => (
              <span>
                {mapTitle[id]}: {value}
              </span>
            )}
          />
        </div>
        <div style={{ height: data.filter(el => el.Confirmed >= limit).length*eachHeight }}>
          <ResponsiveBar
            layout="horizontal"
            data={data.filter(el => el.Confirmed >= limit)}
            keys={keys}
            indexBy="Country_Region"
            margin={{ top: 5, right: 10, bottom: 50, left: 75 }}
            padding={0.3}
            colors={colors}
            axisTop={null}
            axisLeft={{
              format: v =>
                `${(countryName.find(el => el.key === v) || {}).zh || v}`
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "人數",
              legendPosition: "middle",
              legendOffset: 40
            }}
            animate={true}
            labelSkipWidth={16}
            labelSkipHeight={16}
            enableLabel={false}
            tooltip={({ id, value }) => (
              <span>
                {mapTitle[id]}: {value}
              </span>
            )}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {keys.map((el, i) => (
            <div key={i} className="legend-wrapper">
              <div className="legend" style={{ backgroundColor: colors[i] }} />
              <span>{mapTitle[el]}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "right" }}>
          <small>*各國疫情人數持續增加，因此有些國家增加數量過大，會導致較少感染人數的國家圖表顯示不出來。</small>
          <small>另外分為上下部份，下部分為確診人數超過5000人次。</small>
        </div>
      </div>
  )
}

export default CountryChart;