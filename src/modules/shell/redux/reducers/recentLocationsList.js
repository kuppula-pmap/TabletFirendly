import {
  SH_RECENT_LOCATIONS_LIST_REQUEST,
  SH_RECENT_LOCATIONS_LIST_SUCCESS,
  SH_RECENT_LOCATIONS_LIST_FAILURE
} from '../constants/locations-constants';

// Data / Async
function shRecentLocationsListReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case SH_RECENT_LOCATIONS_LIST_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case SH_RECENT_LOCATIONS_LIST_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.locationsList,
      lastUpdated: action.receivedAt
    };
  case SH_RECENT_LOCATIONS_LIST_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default shRecentLocationsListReducer;
