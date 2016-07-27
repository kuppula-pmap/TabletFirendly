import {
  POST_ASPLEGACYSESSION_REQUEST,
  POST_ASPLEGACYSESSION__SUCCESS,
  POST_ASPLEGACYSESSION__FAILURE,
} from '../constants/aspLegacySession-constants';

// Data / Async
function globalAspLegacySessionPostReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case POST_ASPLEGACYSESSION_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case POST_ASPLEGACYSESSION__SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.aspLegacySession,
      lastUpdated: action.receivedAt
    };
  case POST_ASPLEGACYSESSION__FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default globalAspLegacySessionPostReducer;
