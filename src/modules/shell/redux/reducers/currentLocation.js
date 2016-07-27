import {
  SH_POSTCURRENTLOCATION_REQUEST,
  SH_POSTCURRENTLOCATION_SUCCESS,
  SH_POSTCURRENTLOCATION_FAILURE
} from '../constants/currentLocation-constants';

// Data / Async
function shCurrentLocationReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case SH_POSTCURRENTLOCATION_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case SH_POSTCURRENTLOCATION_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.currentLocation,
      lastUpdated: action.receivedAt
    };
  case SH_POSTCURRENTLOCATION_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default shCurrentLocationReducer;
