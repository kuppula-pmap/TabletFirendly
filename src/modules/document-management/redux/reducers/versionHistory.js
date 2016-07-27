import {
  DM_FETCH_VERSION_HISTORY_REQUEST,
  DM_FETCH_VERSION_HISTORY_SUCCESS,
  DM_FETCH_VERSION_HISTORY_FAILURE,
} from '../constants/versionHistory-constants';

// Data / Async
function dmVersionHistoryReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_FETCH_VERSION_HISTORY_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_FETCH_VERSION_HISTORY_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.versionHistory,
      lastUpdated: action.receivedAt
    };
  case DM_FETCH_VERSION_HISTORY_FAILURE:
    return {
      ...state,
      didInvalidate: false,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmVersionHistoryReducer;
