import axios from 'axios';
import zhCountryName from '../config/countryName.json';

export const getCountryVirusData = () => async dispatch => {
  try {
    const res = await axios.get('https://w5q6k.sse.codesandbox.io/api/v1/all')
    let tmpTotal = {
      confirmedCount: 0,
      curedCount: 0,
      deadCount: 0,
    };
    let tmpData = res.data.map(el => {
      tmpTotal.confirmedCount += parseInt(el.Confirmed);
      tmpTotal.curedCount += parseInt(el.Recovered);
      tmpTotal.deadCount += parseInt(el.Deaths);
      el.Confirmed = parseInt(el.Confirmed)
      el.Recovered = parseInt(el.Recovered)
      el.Deaths = parseInt(el.Deaths)
      el.Country_Region = el['Country/Region']
      return el;
    });
    tmpData.sort((a,b)=>{
      return b.Confirmed - a.Confirmed
    })
    dispatch({
      type: "ADD_COUNTRY_INFECTED",
      data: tmpData
    });
    dispatch({
      type: "ADD_TOTAL_DATA",
      data: tmpTotal,
    })
  } catch (err) {
    console.log(err)
  }
};

export const getCountryInfo = () => async dispatch => {
  //來源： https://restcountries.com/#api-endpoints-v2-all
  try {
    const res = await axios.get('https://restcountries.com/v2/all')
    const tmp = zhCountryName.map(el => {
      let detail = res.data.find(e => e.alpha2Code === el.code);
      if (detail) {
        const { region, flag, subregion, alpha3Code } = detail;
        return Object.assign(el, { region, flag, subregion, alpha3Code })
      } else {
        el.region = 'Other';
        el.flag = null;
        el.subregion = 'Other';
        return el;
      }
    })
    dispatch({
      type: "ADD_COUNTRY_INFO",
      data: tmp
    })
  } catch (err) {
    console.log(err)
  }
}