import {
  SH_FETCH_USER_INFO_REQUEST,
  SH_FETCH_USER_INFO_SUCCESS,
  SH_FETCH_USER_INFO_FAILURE
} from '../constants/userInfo-constants';

function shUserInfoReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case SH_FETCH_USER_INFO_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case SH_FETCH_USER_INFO_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.userInfo,
      lastUpdated: action.receivedAt
    };
  case SH_FETCH_USER_INFO_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default shUserInfoReducer;
