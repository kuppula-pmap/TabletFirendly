import {
  SH_LOCATIONS_LIST_REQUEST,
  SH_LOCATIONS_LIST_SUCCESS,
  SH_LOCATIONS_LIST_FAILURE
} from '../constants/locations-constants';

// Data / Async
function shLocationsListReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case SH_LOCATIONS_LIST_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case SH_LOCATIONS_LIST_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.locationsList,
      lastUpdated: action.receivedAt
    };
  case SH_LOCATIONS_LIST_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default shLocationsListReducer;
