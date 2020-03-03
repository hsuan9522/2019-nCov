import initState from '../store'

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_COUNTRY_INFECTED': {
      return {
        ...state,
        countryInfected: action.data,
      };
    }
    case 'ADD_TOTAL_DATA': {
      return {
        ...state,
        totalData: action.data,
      };
    }
    case 'ADD_COUNTRY_INFO': {
      return {
        ...state,
        countryInfo: action.data,
      };
    }
    default:
      return state;
  }
};

export default reducer;