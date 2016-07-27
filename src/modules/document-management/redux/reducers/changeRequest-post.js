import {
  DM_POST_CHANGE_REQUEST_REQUEST,
  DM_POST_CHANGE_REQUEST_SUCCESS,
  DM_POST_CHANGE_REQUEST_FAILURE
} from '../constants/changeRequest-constants';

// Data / Async
function dmChangeRequestPostReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_POST_CHANGE_REQUEST_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_POST_CHANGE_REQUEST_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.changeRequests,
      lastUpdated: action.receivedAt
    };
  case DM_POST_CHANGE_REQUEST_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmChangeRequestPostReducer;
