import {
  DM_POST_DOCUMENT_CHECKIN_REQUEST,
  DM_POST_DOCUMENT_CHECKIN_SUCCESS,
  DM_POST_DOCUMENT_CHECKIN_FAILURE,
} from '../constants/document-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// Checkin
export function postDocumentCheckinRequest(documentId, moduleId, url) {
  return {
    type: DM_POST_DOCUMENT_CHECKIN_REQUEST,
    documentId,
    moduleId,
    url
  };
}

export function postDocumentCheckinSuccess(json) {
  return {
    type: DM_POST_DOCUMENT_CHECKIN_SUCCESS,
    document: json,
    receivedAt: Date.now()
  };
}

export function postDocumentCheckinFailure(error) {
  return {
    type: DM_POST_DOCUMENT_CHECKIN_FAILURE,
    error
  };
}

export function postDocumentCheckin(documentId) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/dm/document/${documentId}/checkin`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'POST',
      headers: sHeaders,
      body: JSON.stringify({})
    };

    dispatch(postDocumentCheckinRequest(documentId, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(postDocumentCheckinFailure(json));
        } else {
          dispatch(postDocumentCheckinSuccess(json));
        }
      })
      .catch(error =>
        dispatch(postDocumentCheckinFailure(error))
      );
  };
}
