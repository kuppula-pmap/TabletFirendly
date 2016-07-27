import {
  DM_FETCH_PERIODIC_REVIEW_REQUEST,
  DM_FETCH_PERIODIC_REVIEW_SUCCESS,
  DM_FETCH_PERIODIC_REVIEW_FAILURE,
} from '../constants/periodicReview-constants';

// Data / Async
function dmPeriodicReviewsReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_FETCH_PERIODIC_REVIEW_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_FETCH_PERIODIC_REVIEW_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.periodicReviews,
      lastUpdated: action.receivedAt
    };
  case DM_FETCH_PERIODIC_REVIEW_FAILURE:
    return {
      ...state,
      didInvalidate: false,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmPeriodicReviewsReducer;
