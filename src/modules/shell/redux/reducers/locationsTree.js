import {
  SH_LOCATIONS_TREE_REQUEST,
  SH_LOCATIONS_TREE_SUCCESS,
  SH_LOCATIONS_TREE_FAILURE
} from '../constants/locations-constants';

// Data / Async
function shLocationsTreeReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case SH_LOCATIONS_TREE_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case SH_LOCATIONS_TREE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.locationsTree,
      lastUpdated: action.receivedAt
    };
  case SH_LOCATIONS_TREE_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default shLocationsTreeReducer;
