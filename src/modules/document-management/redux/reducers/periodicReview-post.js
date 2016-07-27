import {
  DM_POST_PERIODIC_REVIEW_REQUEST,
  DM_POST_PERIODIC_REVIEW_SUCCESS,
  DM_POST_PERIODIC_REVIEW_FAILURE,
  DM_POST_PERIODIC_REVIEW_RESET,
} from '../constants/periodicReview-constants';

// Data / Async
function dmPeriodicReviewPostReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: null
}, action) {
  switch (action.type) {
  case DM_POST_PERIODIC_REVIEW_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_POST_PERIODIC_REVIEW_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.periodicReview,
      lastUpdated: action.receivedAt
    };
  case DM_POST_PERIODIC_REVIEW_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  case DM_POST_PERIODIC_REVIEW_RESET:
    return {
      ...state,
      isFetching: false,
      items: null,
      didInvalidate: false,
      error: null,
      lastUpdated: action.receivedAt,
    };
  default:
    return state;
  }
}


export default dmPeriodicReviewPostReducer;
