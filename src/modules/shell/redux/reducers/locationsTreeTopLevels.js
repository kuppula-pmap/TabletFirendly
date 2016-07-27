import {
  SH_LOCATIONS_TREETOPLEVELS_REQUEST,
  SH_LOCATIONS_TREETOPLEVELS_SUCCESS,
  SH_LOCATIONS_TREETOPLEVELS_FAILURE
} from '../constants/locations-constants';

// Data / Async
function shLocationsTreeTopLevelsReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case SH_LOCATIONS_TREETOPLEVELS_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case SH_LOCATIONS_TREETOPLEVELS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.topLevels,
      lastUpdated: action.receivedAt
    };
  case SH_LOCATIONS_TREETOPLEVELS_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default shLocationsTreeTopLevelsReducer;
