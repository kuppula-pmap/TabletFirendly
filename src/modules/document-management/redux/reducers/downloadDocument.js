import {
  DM_FETCH_DOWNLOAD_DOCUMENT_REQUEST,
  DM_FETCH_DOWNLOAD_DOCUMENT_SUCCESS,
  DM_FETCH_DOWNLOAD_DOCUMENT_FAILURE,
  DM_FETCH_DOWNLOAD_DOCUMENT_RESET,
} from '../constants/downloadDocument-constants';

// Data / Async
function dmDownloadDocumentReducer(state = {
  isFetching: true,
  didInvalidate: false,
  downloadDocument: null
}, action) {
  switch (action.type) {
  case DM_FETCH_DOWNLOAD_DOCUMENT_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_FETCH_DOWNLOAD_DOCUMENT_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      downloadDocument: action.downloadDocument,
      lastUpdated: action.receivedAt
    };
  case DM_FETCH_DOWNLOAD_DOCUMENT_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error,
      downloadDocument: action.downloadDocument,
    };
  case DM_FETCH_DOWNLOAD_DOCUMENT_RESET:
    return {
      ...state,
      isFetching: false,
      downloadDocument: null,
      didInvalidate: false,
      error: null,
      lastUpdated: action.receivedAt,
    };
  default:
    return state;
  }
}


export default dmDownloadDocumentReducer;
