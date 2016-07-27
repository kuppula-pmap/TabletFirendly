import {
  DM_FETCH_LOOKUPS_REQUEST,
  DM_FETCH_LOOKUPS_SUCCESS,
  DM_FETCH_LOOKUPS_FAILURE
} from '../constants/lookups-constants';

// Data / Async
function dmLookupsReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_FETCH_LOOKUPS_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_FETCH_LOOKUPS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.lookups,
      lastUpdated: action.receivedAt
    };
  case DM_FETCH_LOOKUPS_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmLookupsReducer;
