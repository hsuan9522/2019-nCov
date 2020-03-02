import initState from '../store'

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_COUNTRY_DATA': {
      return {
        ...state,
        countryData: action.data,
      };
    }
    case 'ADD_TOTAL_DATA': {
      return {
        ...state,
        totalData: action.data,
      };
    }
    default:
      return state;
  }
};

export default reducer;