import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import _ from "lodash";

import Region from "./Region"

const State = () => {
  const countryInfected = useSelector(state=>state.countryInfected);
  const countryName = useSelector(state => state.countryInfo);
  const [dataRegion, setDataRegion] = useState([])

  useEffect(()=>{
    // const data = countryInfected.map(el=>{
    //   let info = countryName.find(e=>e.key === el.Country_Region );
    //   if(info){
    //     return Object.assign(el,info);
    //   }else{
    //     el.region = 'Other';
    //     el.subregion = 'Other';
    //     el.flag = null;
    //     return el;
    //   }
    // })
    // const dataByRegion = Object.values(data.reduce((acc, re)=>{
    //   if(acc[re.region]){
    //     acc[re.region]['Confirmed'] += re.Confirmed;
    //     acc[re.region]['Deaths'] += re.Deaths;
    //     acc[re.region]['Recovered'] += re.Recovered;
    //   }else{
    //     acc[re.region] = {
    //       region: re.region,
    //       Confirmed: re.Confirmed,
    //       Deaths: re.Deaths,
    //       Recovered: re.Recovered,
    //     };
    //   }
    //   return acc;
    // },{}))
    console.log('countryInfected', countryInfected);
    console.log('countryName', countryName);
    // setDataRegion(dataByRegion);
  }, [countryInfected, countryName])

  return (
    <div>
      {dataRegion &&
        <Region data={dataRegion} />
      }

      <div>123</div>
    </div>
  )
}

export default State;