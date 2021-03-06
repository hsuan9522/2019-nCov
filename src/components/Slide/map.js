import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux"
import { ResponsiveChoropleth } from '@nivo/geo'

import mapFeature from "../../config/map.json"

import './map.scss';

const Map = (props)=> {
  const infected = useSelector(state=>state.countryInfected);
  const [data, setData] = useState([]);
  // const colors = ["rgb(215, 100, 69)", "#F36A62", "rgb(232, 193, 160)","#EBDFCF", "rgb(151, 227, 213)", "rgb(0, 176, 167)"];

  useEffect(()=>{
    const tmp = infected.map(el=>{
      return {
        id: el.alpha3Code,
        value: el.Confirmed,
        zh: el.zh
      }
    })
    setData(tmp);
  }, [infected])
  return (
    <div className="map-wrapper">
      <div className="close-btn" onClick={()=>props.onClick()}>Close</div>
      {/* <h3 className="h3-title">確診人數世界地圖</h3> */}
      <ResponsiveChoropleth
        data={data}
        features={mapFeature.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[0, 90000]}
        unknownColor="#c7c7c7"
        label="data.zh"
        valueFormat=",.0f"
        projectionType="equirectangular"
        projectionScale={155}
        projectionRotation={[0, 0, 0]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 200,
            translateY: -120,
            itemsSpacing: 0,
            itemWidth: 110,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: '#ffffff',
            itemOpacity: 0.95,
            symbolSize: 18,
          }
        ]}
      />
    </div>
  )
}

export default Map;