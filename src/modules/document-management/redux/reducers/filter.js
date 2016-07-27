import {
  DM_FETCH_FILTER_REQUEST,
  DM_FETCH_FILTER_SUCCESS,
  DM_FETCH_FILTER_FAILURE
} from '../constants/filter-constants';

// Data / Async
function dmFilterReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_FETCH_FILTER_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_FETCH_FILTER_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      query: action.query,
      items: action.filter,
      lastUpdated: action.receivedAt
    };
  case DM_FETCH_FILTER_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmFilterReducer;
