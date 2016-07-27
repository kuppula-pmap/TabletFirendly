import {
  SH_FETCH_MODULE_LABELS_REQUEST,
  SH_FETCH_MODULE_LABELS_SUCCESS,
  SH_FETCH_MODULE_LABELS_FAILURE
} from '../constants/moduleLabels-constants';

// Data / Async
function shModuleLabelsReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case SH_FETCH_MODULE_LABELS_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case SH_FETCH_MODULE_LABELS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.moduleLabels,
      itemsOriginal: action.moduleLabelsOriginal,
      lastUpdated: action.receivedAt
    };
  case SH_FETCH_MODULE_LABELS_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default shModuleLabelsReducer;
