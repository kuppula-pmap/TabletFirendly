import {
  DM_DELETE_DOCUMENT_REQUEST,
  DM_DELETE_DOCUMENT_SUCCESS,
  DM_DELETE_DOCUMENT_FAILURE
} from '../constants/document-constants';

// Data / Async
function dmDocumentDeleteReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_DELETE_DOCUMENT_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_DELETE_DOCUMENT_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.document,
      lastUpdated: action.receivedAt
    };
  case DM_DELETE_DOCUMENT_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmDocumentDeleteReducer;
