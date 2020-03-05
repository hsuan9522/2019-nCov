import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie'
import './region.scss';

const Region = (props) => {
  const [data, setData] = useState([]);
  const mapTitle = ["確診人數", "治癒人數", "死亡人數"];
  const regionTitle = {
    Asia: "亞洲",
    Europe: "歐洲",
    Other: "其他",
    Americas: "美洲",
    Oceania: "大洋洲",
    Africa: "非洲"
  }
  const nivoColor = ["rgb(232, 193, 160)", "rgb(244, 117, 96)", "rgb(241, 225, 91)", "rgb(232, 168, 56)", "rgb(97, 205, 187)"]

  useEffect(() => {
    let tmp = [[], [], []]
    props.data.forEach(el => {
      tmp[0].push({ id: el.region, value: el.Confirmed, label: regionTitle[el.region] });
      tmp[1].push({ id: el.region, value: el.Recovered, label: regionTitle[el.region] });
      tmp[2].push({ id: el.region, value: el.Deaths, label: regionTitle[el.region] });
    })
    setData(tmp);
  }, [props.data])


  return (
    <div>
      <div className="pie-wrapper">
        {
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
                />
              </div>
            )
          })
        }
      </div>
      <div style={{ textAlign: "center", marginTop: "10px"}}>
        { data.length!=0 &&
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
    </div>
  )
}

export default Region;