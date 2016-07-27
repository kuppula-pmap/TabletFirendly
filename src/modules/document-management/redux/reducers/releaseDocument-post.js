import {
  DM_POST_RELEASE_DOCUMENT_REQUEST,
  DM_POST_RELEASE_DOCUMENT_SUCCESS,
  DM_POST_RELEASE_DOCUMENT_FAILURE
} from '../constants/releaseDocument-constants';

// Data / Async
function dmReleaseDocumentPostReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_POST_RELEASE_DOCUMENT_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_POST_RELEASE_DOCUMENT_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.releaseDocuments,
      lastUpdated: action.receivedAt
    };
  case DM_POST_RELEASE_DOCUMENT_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmReleaseDocumentPostReducer;
