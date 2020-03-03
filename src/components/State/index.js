import React, { useEffect } from "react";
import { useSelector } from "react-redux"
import _ from "lodash";

const State = () => {
  const countryInfected = useSelector(state=>state.countryInfected);
  const countryName = useSelector(state=>state.countryInfo);

  useEffect(()=>{
    console.log(_.groupBy(countryName,'subregion'))

  })

  return (
    <div>
      <div>123</div>
    </div>
  )
}

export default State;