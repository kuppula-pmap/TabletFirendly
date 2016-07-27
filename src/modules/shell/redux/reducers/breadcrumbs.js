import {
  SH_BREADCRUMBS_REQUEST,
  SH_BREADCRUMBS_SUCCESS,
  SH_BREADCRUMBS_FAILURE
} from '../constants/breadcrumbs-constants';

// Data / Async
function shBreadcrumbsReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: [
    { Id: 1 }
  ]
}, action) {
  switch (action.type) {
  case SH_BREADCRUMBS_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case SH_BREADCRUMBS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.breadcrumbs,
      lastUpdated: action.receivedAt
    };
  case SH_BREADCRUMBS_FAILURE:
    return {
      ...state,
      didInvalidate: false,
      error: action.error
    };
  default:
    return state;
  }
}


export default shBreadcrumbsReducer;
