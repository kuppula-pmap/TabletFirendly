import {
  DM_FETCH_DOCUMENT_REQUEST,
  DM_FETCH_DOCUMENT_SUCCESS,
  DM_FETCH_DOCUMENT_FAILURE,
  // Checkin.
  DM_POST_DOCUMENT_CHECKIN_REQUEST,
  DM_POST_DOCUMENT_CHECKIN_SUCCESS,
  DM_POST_DOCUMENT_CHECKIN_FAILURE,
  // Checkout.
  DM_POST_DOCUMENT_CHECKOUT_REQUEST,
  DM_POST_DOCUMENT_CHECKOUT_SUCCESS,
  DM_POST_DOCUMENT_CHECKOUT_FAILURE,
  // Cancel checkout.
  DM_POST_DOCUMENT_CANCEL_CHECKOUT_REQUEST,
  DM_POST_DOCUMENT_CANCEL_CHECKOUT_SUCCESS,
  DM_POST_DOCUMENT_CANCEL_CHECKOUT_FAILURE
} from '../constants/document-constants';

// Data / Async
function dmDocumentReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_FETCH_DOCUMENT_REQUEST:
  case DM_POST_DOCUMENT_CHECKIN_REQUEST:
  case DM_POST_DOCUMENT_CHECKOUT_REQUEST:
  case DM_POST_DOCUMENT_CANCEL_CHECKOUT_REQUEST:
    return {
      ...state,
      requestedDocumentId: action.documentId,
      requestedVersionId: action.versionId,
      isFetching: true,
      didInvalidate: false
    };
  case DM_FETCH_DOCUMENT_SUCCESS:
  case DM_POST_DOCUMENT_CHECKIN_SUCCESS:
  case DM_POST_DOCUMENT_CHECKOUT_SUCCESS:
  case DM_POST_DOCUMENT_CANCEL_CHECKOUT_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.document,
      lastUpdated: action.receivedAt
    };
  case DM_FETCH_DOCUMENT_FAILURE:
  case DM_POST_DOCUMENT_CHECKIN_FAILURE:
  case DM_POST_DOCUMENT_CHECKOUT_FAILURE:
  case DM_POST_DOCUMENT_CANCEL_CHECKOUT_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmDocumentReducer;
