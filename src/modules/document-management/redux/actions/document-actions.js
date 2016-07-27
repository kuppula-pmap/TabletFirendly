import {
  DM_FETCH_DOCUMENT_REQUEST,
  DM_FETCH_DOCUMENT_SUCCESS,
  DM_FETCH_DOCUMENT_FAILURE
} from '../constants/document-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// Documents
export function fetchDocumentRequest(documentId, versionId, moduleId, url) {
  return {
    type: DM_FETCH_DOCUMENT_REQUEST,
    documentId,
    versionId,
    moduleId,
    url
  };
}

export function fetchDocumentSuccess(json) {
  return {
    type: DM_FETCH_DOCUMENT_SUCCESS,
    document: json,
    receivedAt: Date.now()
  };
}

export function fetchDocumentFailure(error) {
  return {
    type: DM_FETCH_DOCUMENT_FAILURE,
    error
  };
}

export function fetchDocument(documentId, targetVersion) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    let url = `${globalSettings.apiUrl}/papi/dm/document/${documentId}`;

    // If target version is available as an arguement.
    if (typeof targetVersion !== 'undefined' && targetVersion.length) {
      // Add it to the query string.
      url = url.concat(`?targetVersion=${targetVersion}`);
    }

    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };


    dispatch(fetchDocumentRequest(documentId, targetVersion, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchDocumentFailure(json));
        } else {
          dispatch(fetchDocumentSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchDocumentFailure(error))
      );
  };
}
