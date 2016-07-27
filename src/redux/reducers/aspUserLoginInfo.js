import {
  FETCH_ASPUSERLOGININFO_REQUEST,
  FETCH_ASPUSERLOGININFO_SUCCESS,
  FETCH_ASPUSERLOGININFO_FAILURE
} from '../constants/aspUserLoginInfo-constants';

// Data / Async
function globalAspSettingsPostReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case FETCH_ASPUSERLOGININFO_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case FETCH_ASPUSERLOGININFO_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.aspUserLoginInfo,
      lastUpdated: action.receivedAt
    };
  case FETCH_ASPUSERLOGININFO_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default globalAspSettingsPostReducer;
