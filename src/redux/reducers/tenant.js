import {
  GLOBAL_FETCH_TENANT_REQUEST,
  GLOBAL_FETCH_TENANT_SUCCESS,
  GLOBAL_FETCH_TENANT_FAILURE
} from '../constants/tenant-constants';

function globalTenantReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case GLOBAL_FETCH_TENANT_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case GLOBAL_FETCH_TENANT_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.tenant,
      lastUpdated: action.receivedAt
    };
  case GLOBAL_FETCH_TENANT_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default globalTenantReducer;
