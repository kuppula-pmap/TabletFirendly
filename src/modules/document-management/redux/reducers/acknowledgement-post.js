import {
  DM_POST_ACKNOWLEDGEMENT_REQUEST,
  DM_POST_ACKNOWLEDGEMENT_SUCCESS,
  DM_POST_ACKNOWLEDGEMENT_FAILURE
} from '../constants/acknowledgement-constants';

// Data / Async
function dmAcknowledgementPostReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_POST_ACKNOWLEDGEMENT_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_POST_ACKNOWLEDGEMENT_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.acknowledgement,
      lastUpdated: action.receivedAt
    };
  case DM_POST_ACKNOWLEDGEMENT_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmAcknowledgementPostReducer;
