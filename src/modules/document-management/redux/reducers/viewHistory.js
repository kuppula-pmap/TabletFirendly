import {
  DM_FETCH_VIEW_HISTORY_REQUEST,
  DM_FETCH_VIEW_HISTORY_SUCCESS,
  DM_FETCH_VIEW_HISTORY_FAILURE,
} from '../constants/viewHistory-constants';

// Data / Async
function dmViewHistoryReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_FETCH_VIEW_HISTORY_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_FETCH_VIEW_HISTORY_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.viewHistory,
      lastUpdated: action.receivedAt
    };
  case DM_FETCH_VIEW_HISTORY_FAILURE:
    return {
      ...state,
      didInvalidate: false,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmViewHistoryReducer;
