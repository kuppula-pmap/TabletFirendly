import {
  DM_FETCH_PERMISSIONS_REQUEST,
  DM_FETCH_PERMISSIONS_SUCCESS,
  DM_FETCH_PERMISSIONS_FAILURE
} from '../constants/permissions-constants';

// Data / Async
function dmPermissionsReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_FETCH_PERMISSIONS_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_FETCH_PERMISSIONS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.permissions,
      lastUpdated: action.receivedAt
    };
  case DM_FETCH_PERMISSIONS_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmPermissionsReducer;
