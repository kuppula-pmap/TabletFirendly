import {
  DM_FETCH_CHANGE_REQUEST_REQUEST,
  DM_FETCH_CHANGE_REQUEST_SUCCESS,
  DM_FETCH_CHANGE_REQUEST_FAILURE,
} from '../constants/changeRequest-constants';

// Data / Async
function dmChangeRequestReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_FETCH_CHANGE_REQUEST_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_FETCH_CHANGE_REQUEST_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.changeRequests,
      lastUpdated: action.receivedAt
    };
  case DM_FETCH_CHANGE_REQUEST_FAILURE:
    return {
      ...state,
      didInvalidate: false,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmChangeRequestReducer;
