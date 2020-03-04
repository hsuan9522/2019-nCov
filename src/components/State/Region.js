import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie'
import './region.scss';

const Region = (props) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const color = "#00000"
    let tmp = [[], [], []]
    props.data.forEach(el => {
      tmp[0].push({ id: el.region, value: el.Confirmed });
      tmp[1].push({ id: el.region, value: el.Recovered });
      tmp[2].push({ id: el.region, value: el.Deaths });
    })
    setData(tmp);
  }, [props.data])


  return (
    <div className="pie-wrapper">
      {
        data.map((el, index) => {
          return (
            <div className="pie">
              <ResponsivePie
                key={index}
                data={el}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.3}
                padAngle={3}
                cornerRadius={2}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                enableRadialLabels={false}
                slicesLabelsSkipAngle={10}
                motionStiffness={90}
                motionDamping={15}
              />
            </div>
          )
        })
      }
      <div>
        123
      </div>
    </div>
  )
}

export default Region;