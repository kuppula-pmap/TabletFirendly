import {
  SH_POST_LEGACYVIEW_REQUEST,
  SH_POST_LEGACYVIEW_SUCCESS,
  SH_POST_LEGACYVIEW_FAILURE
} from '../constants/legacyView-constants';

function shlegacyViewReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case SH_POST_LEGACYVIEW_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case SH_POST_LEGACYVIEW_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.legacyView,
      lastUpdated: action.receivedAt
    };
  case SH_POST_LEGACYVIEW_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default shlegacyViewReducer;
