import {
  DM_FETCH_AUDIT_TRAIL_REQUEST,
  DM_FETCH_AUDIT_TRAIL_SUCCESS,
  DM_FETCH_AUDIT_TRAIL_FAILURE,
} from '../constants/auditTrail-constants';

// Data / Async
function dmAuditTrailReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_FETCH_AUDIT_TRAIL_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_FETCH_AUDIT_TRAIL_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.auditTrail,
      lastUpdated: action.receivedAt
    };
  case DM_FETCH_AUDIT_TRAIL_FAILURE:
    return {
      ...state,
      didInvalidate: false,
      error: action.error
    };
  default:
    return state;
  }
}

export default dmAuditTrailReducer;
