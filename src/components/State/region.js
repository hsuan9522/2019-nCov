import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie'
import './region.scss';

import EachRegion from "./eachRegion"

const Region = (props) => {
  const [data, setData] = useState([]);
  const [chartSwitch, setChartSwitch] = useState(false);
  const [clickData, setClickData] = useState(null);
  const mapTitle = ["確診人數", "治癒人數", "死亡人數"];
  
  const nivoColor = ["rgb(232, 193, 160)", "rgb(244, 117, 96)", "rgb(241, 225, 91)", "rgb(232, 168, 56)", "rgb(97, 205, 187)", "rgb(151, 227, 213)"]

  useEffect(() => {
    let tmp = [[], [], []]
    const regionTitle = {
      Asia: "亞洲",
      Europe: "歐洲",
      Other: "其他",
      Americas: "美洲",
      Oceania: "大洋洲",
      Africa: "非洲",
    };
    props.data.forEach(el => {
      tmp[0].push({ id: el.region, value: el.Confirmed, label: regionTitle[el.region], country: el.confirmedDetail });
      tmp[1].push({ id: el.region, value: el.Recovered, label: regionTitle[el.region], country: el.recoveredDetail });
      tmp[2].push({ id: el.region, value: el.Deaths, label: regionTitle[el.region], country: el.deathsDetail });
    })
    setData(tmp);
  }, [props.data])

  function handleClick(data, i) {
    if(data.value===0) return false;
    setChartSwitch(true);
    data.index = i;
    setClickData(data);
  }

  return (
    <div>
      {!chartSwitch ?
        <div>
          <h3 className="h3-title" style={{marginBottom: "20px"}}>五大洲圓餅圖</h3>
          <div className="pie-wrapper">
            {!chartSwitch &&
              data.map((el, index) => {
                return (
                  <div className="pie" key={index}>
                    <h3 className="title">{mapTitle[index]}</h3>
                    <ResponsivePie
                      data={el}
                      margin={{ top: 5, right: 10, bottom: 60, left: 10 }}
                      innerRadius={0.3}
                      padAngle={3}
                      cornerRadius={2}
                      colors={nivoColor}
                      borderWidth={1}
                      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                      enableRadialLabels={false}
                      slicesLabelsSkipAngle={10}
                      motionStiffness={90}
                      motionDamping={15}
                      tooltip={function (e) { return <div >{e.label} : {e.value}</div> }}
                      onClick={(data, event) => handleClick(data,index)}
                    />
                  </div>
                )
              })
            }
          </div>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            {data.length !== 0 &&
              data[0].map((el, index) => {
                return (
                  <div key={index} className="pie-labels-wrapper">
                    <span className="pie-labels" style={{ background: nivoColor[index] }}></span>
                    {el.label}
                  </div>
                )
              })
            }
          </div>
        </div> :
        <div>
          <div style={{ textDecoration: "underline", color: "cornflowerblue", cursor: "pointer"}} onClick={() => { setChartSwitch(false); setClickData(null) }}>返回</div>
          <EachRegion data={clickData}/>
        </div>
      }
    </div>
  )
}

export default Region;