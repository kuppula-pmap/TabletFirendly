import {
  DM_FETCH_PREVIEW_DOCUMENT_REQUEST,
  DM_FETCH_PREVIEW_DOCUMENT_SUCCESS,
  DM_FETCH_PREVIEW_DOCUMENT_FAILURE,
  DM_FETCH_PREVIEW_DOCUMENT_RESET,
} from '../constants/previewDocument-constants';

// Data / Async
function dmPreviewDocumentReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: null
}, action) {
  switch (action.type) {
  case DM_FETCH_PREVIEW_DOCUMENT_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_FETCH_PREVIEW_DOCUMENT_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.previewDocument,
      lastUpdated: action.receivedAt
    };
  case DM_FETCH_PREVIEW_DOCUMENT_FAILURE:
    return {
      ...state,
      didInvalidate: false,
      error: action.error,
      items: null,
    };
  case DM_FETCH_PREVIEW_DOCUMENT_RESET:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: null,
    };
  default:
    return state;
  }
}


export default dmPreviewDocumentReducer;
