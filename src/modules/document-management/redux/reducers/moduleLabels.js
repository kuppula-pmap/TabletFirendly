import {
  DM_FETCH_MODULE_LABELS_REQUEST,
  DM_FETCH_MODULE_LABELS_SUCCESS,
  DM_FETCH_MODULE_LABELS_FAILURE
} from '../constants/moduleLabels-constants';

// Data / Async
function dmModuleLabelsReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_FETCH_MODULE_LABELS_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_FETCH_MODULE_LABELS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.moduleLabels,
      itemsOriginal: action.moduleLabelsOriginal,
      lastUpdated: action.receivedAt
    };
  case DM_FETCH_MODULE_LABELS_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmModuleLabelsReducer;
