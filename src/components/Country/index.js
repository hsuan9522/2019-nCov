import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveBar } from "@nivo/bar";

const CountryChart = props => {
  const data = useSelector(state => state.countryInfected);
  const countryName = useSelector(state => state.countryInfo);
  if(!data || !countryName) return (<div>There is no Data!</div>)
  const withoutChina = data.filter(
    el => el.Country_Region !== "Mainland China"
  );
  const mapTitle = {
    Confirmed: "確診人數",
    Recovered: "治癒人數",
    Deaths: "死亡人數"
  };
  const keys = ["Confirmed", "Recovered", "Deaths"];
  const colors = ["#E2C2A4", "#7ECABC", "#E47C67"];

  return (
      <div>
        <h3 className="h3-title">各國人數狀態</h3>
        <div style={{ height: "2000px" }}>
          <ResponsiveBar
            layout="horizontal"
            data={withoutChina}
            keys={keys}
            indexBy="Country_Region"
            margin={{ top: 5, right: 10, bottom: 50, left: 65 }}
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
        <div style={{ height: "85px" }}>
          <ResponsiveBar
            layout="horizontal"
            data={data.filter(el => el.Country_Region === "Mainland China")}
            keys={keys}
            indexBy="Country_Region"
            margin={{ top: 5, right: 10, bottom: 50, left: 65 }}
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
          <small>另外中國與其他國家人數差異過大，獨立為一圖表。</small>
        </div>
      </div>
  )
}

export default CountryChart;