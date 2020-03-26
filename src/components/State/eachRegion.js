import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const EachRegion = (props) => {
  const mapType = ["Confirmed", "Recovered", "Deaths"];
  const mapTitle = {
    Confirmed: "確診人數",
    Recovered: "治癒人數",
    Deaths: "死亡人數"
  }
  props.data.country.sort((a, b) => b[mapType[props.data.index]] - a[mapType[props.data.index]])
  
  return (
    <div>
      <h3 style={{textAlign: "center"}}>{props.data.label}<br/>{mapTitle[mapType[props.data.index]]}</h3>
      <div style={{ height: "500px", display: "flex" }}>
        <ResponsiveBar
          data={props.data.country}
          keys={[mapType[props.data.index]]}
          indexBy="Country_Region"
          margin={{ top: 15, right: 10, bottom: 70, left: 65 }}
          padding={props.data.country.length> 20 ?0.3 :0.7}
          colors={{ scheme: "nivo"}}
          axisBottom={{
            format: v => `${(props.data.country.find(el => el.key === v) || {}).zh || v}`,
            tickRotation: -40
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            legend: "人數",
            legendPosition: "start",
            legendOffset: -55
          }}
          animate={true}
          labelSkipWidth={16}
          labelSkipHeight={16}
          enableLabel={false}
          tooltip={({ id, value }) => (
            <span>
              {value}
            </span>
          )}
        />
      </div>
    </div>
  )
}

export default EachRegion;