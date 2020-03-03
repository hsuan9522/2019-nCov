import axios from 'axios';
import zhCountryName from '../config/countryName.json';

export const getCountryVirusData = ()=> {
  return (dispatch) =>{
    return axios.get('https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&outSR=102100&resultOffset=0&resultRecordCount=250&cacheHint=true')
      .then(res=>{
        let tmpTotal = {
          confirmedCount: 0,
          curedCount: 0,
          deadCount: 0,
          updateTime: 0
        };
        const tmpData = res.data.features.map(el => {
          tmpTotal.confirmedCount += el.attributes.Confirmed;
          tmpTotal.curedCount += el.attributes.Recovered;
          tmpTotal.deadCount += el.attributes.Deaths;
          tmpTotal.updateTime =
            el.attributes.Last_Update > tmpTotal.updateTime
              ? el.attributes.Last_Update
              : tmpTotal.updateTime;
          return el.attributes;
        });
        dispatch({
          type: "ADD_COUNTRY_INFECTED",
          data: tmpData
        });
        dispatch({
          type: "ADD_TOTAL_DATA",
          data: tmpTotal,
        })
      })
  }
}

export const getCountryInfo = ()=> {
  return dispatch =>{
    return axios.get('https://restcountries.eu/rest/v2/all')
      .then(res=>{
        const tmp = zhCountryName.map(el=>{
          let detail = res.data.find(e => e.alpha2Code===el.code);
          if(detail){
            const { region, flag, subregion } = detail;
            return Object.assign(el, { region, flag, subregion })
          }else{
            return el;
          }
        })
        dispatch({ 
          type: "ADD_COUNTRY_INFO",
          data: tmp
        })
      })
      .catch(err=>{
      })
  }
}

// export { getCountryVirusData }