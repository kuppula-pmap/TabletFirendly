import {
  DM_FETCH_PREVIEW_DOCUMENT_REQUEST,
  DM_FETCH_PREVIEW_DOCUMENT_SUCCESS,
  DM_FETCH_PREVIEW_DOCUMENT_FAILURE,
  DM_FETCH_PREVIEW_DOCUMENT_RESET,
} from '../constants/previewDocument-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// Documents
export function fetchPreviewDocumentRequest(docId, moduleId, url) {
  return {
    type: DM_FETCH_PREVIEW_DOCUMENT_REQUEST,
    docId,
    moduleId,
    url
  };
}

export function fetchPreviewDocumentSuccess(json) {
  return {
    type: DM_FETCH_PREVIEW_DOCUMENT_SUCCESS,
    previewDocument: json,
    receivedAt: Date.now()
  };
}

export function fetchPreviewDocumentFailure(error) {
  return {
    type: DM_FETCH_PREVIEW_DOCUMENT_FAILURE,
    error
  };
}

export function resetPreviewDocument() {
  return {
    type: DM_FETCH_PREVIEW_DOCUMENT_RESET,
  };
}

export function fetchPreviewDocument(docId, action) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/dm/document/PreviewAsPDF/${docId}?action=${action}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchPreviewDocumentRequest(docId, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchPreviewDocumentFailure(json));
        } else {
          dispatch(fetchPreviewDocumentSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchPreviewDocumentFailure(error))
      );
  };
}
