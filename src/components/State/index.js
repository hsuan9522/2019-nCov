import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"

import Region from "./region"

const State = () => {
  const countryInfected = useSelector(state=>state.countryInfected);
  const countryName = useSelector(state => state.countryInfo);
  const [dataRegion, setDataRegion] = useState([])

  useEffect(()=>{
    if(!countryName || !countryInfected) return ()=>{};
    const data = countryInfected.map(el=>{
      let info = countryName.find(e=>e.key === el.Country_Region );
      if(info){
        return Object.assign(el,info);
      }else{
        el.region = 'Other';
        el.subregion = 'Other';
        el.flag = null;
        return el;
      }
    })
    const dataByRegion = Object.values(data.reduce((acc, re)=>{
      if(acc[re.region]){
        acc[re.region]['Confirmed'] += re.Confirmed;
        acc[re.region]['confirmedDetail'].push(re)
        acc[re.region]['Deaths'] += re.Deaths;
        acc[re.region]['deathsDetail'].push(re)
        acc[re.region]['Recovered'] += re.Recovered;
        acc[re.region]['recoveredDetail'].push(re)
      }else{
        acc[re.region] = {
          region: re.region,
          Confirmed: re.Confirmed,
          Deaths: re.Deaths,
          Recovered: re.Recovered,
          confirmedDetail: [],
          deathsDetail:[],
          recoveredDetail: []
        };
        acc[re.region].confirmedDetail.push(re);
        acc[re.region].deathsDetail.push(re);
        acc[re.region].recoveredDetail.push(re);
      }
      return acc;
    },{}))
    setDataRegion(dataByRegion);
  }, [countryInfected, countryName])

  return (
    <div style={{marginTop: "30px"}}>
      {dataRegion &&
        <Region data={dataRegion} />
      }
    </div>
  )
}

export default State;