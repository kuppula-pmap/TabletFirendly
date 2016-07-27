import {
  DM_FILE_UPLOAD_DOCUMENT_REQUEST,
  DM_FILE_UPLOAD_DOCUMENT_SUCCESS,
  DM_FILE_UPLOAD_DOCUMENT_FAILURE,
  DM_FILE_UPLOAD_DOCUMENT_RESET
} from '../constants/upload-constants';

function dmUploadReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  uploadedItems: [],
  requestedItems: []
}, action) {
  switch (action.type) {
  case DM_FILE_UPLOAD_DOCUMENT_REQUEST:
    return {
      ...state,
      items: [],
      isFetching: true,
      didInvalidate: false,
      requestedItems: state.requestedItems ? state.requestedItems.concat(action.file) : action.file,
    };
  case DM_FILE_UPLOAD_DOCUMENT_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.upload,
      uploadedItems: state.uploadedItems ? state.uploadedItems.concat(action.upload) : action.upload,
      requestedItems: state.requestedItems ? state.requestedItems.filter(item => item.name !== action.upload[0].FileName) : action.file,
      lastUpdated: action.receivedAt
    };
  case DM_FILE_UPLOAD_DOCUMENT_FAILURE:
    return {
      ...state,
      isFetching: false,
      didInvalidate: true,
      error: action.error
    };
  case DM_FILE_UPLOAD_DOCUMENT_RESET:
    return {
      ...state,
      isFetching: false,
      items: [],
      uploadedItems: [],
      requestedItems: [],
      didInvalidate: false,
      error: null,
      lastUpdated: action.receivedAt,
    };
  default:
    return state;
  }
}

export default dmUploadReducer;
