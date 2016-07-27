import {
  GLOBAL_FETCH_AUTH_REQUEST,
  GLOBAL_FETCH_AUTH_SUCCESS,
  GLOBAL_FETCH_AUTH_FAILURE
} from '../constants/auth-constants';

function globalAuthReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case GLOBAL_FETCH_AUTH_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case GLOBAL_FETCH_AUTH_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.auth,
      lastUpdated: action.receivedAt
    };
  case GLOBAL_FETCH_AUTH_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default globalAuthReducer;
