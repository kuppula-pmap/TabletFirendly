import {
  DM_FETCH_DOWNLOAD_DOCUMENT_REQUEST,
  DM_FETCH_DOWNLOAD_DOCUMENT_SUCCESS,
  DM_FETCH_DOWNLOAD_DOCUMENT_FAILURE,
  DM_FETCH_DOWNLOAD_DOCUMENT_RESET,
} from '../constants/downloadDocument-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// Documents
export function fetchDownloadDocumentRequest(apiUrl, moduleId, url) {
  return {
    type: DM_FETCH_DOWNLOAD_DOCUMENT_REQUEST,
    apiUrl,
    moduleId,
    url
  };
}

export function fetchDownloadDocumentSuccess() {
  return {
    type: DM_FETCH_DOWNLOAD_DOCUMENT_SUCCESS,
    downloadDocument: true,
    receivedAt: Date.now()
  };
}

export function fetchDownloadDocumentFailure(error) {
  return {
    type: DM_FETCH_DOWNLOAD_DOCUMENT_FAILURE,
    downloadDocument: false,
    error
  };
}

export function resetDownloadDocument() {
  return {
    type: DM_FETCH_DOWNLOAD_DOCUMENT_RESET
  };
}

export function fetchDownloadDocument(apiUrl) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = apiUrl;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchDownloadDocumentRequest(apiUrl, dmSettings.moduleId, url));

    return fetch(url, sInit)
      // .then(response => response.json())
      .then(respsonse => {
        // console.log('respsonse status:', respsonse.status);
        // console.log('json:', json);

        if (respsonse.status === 200) {
          dispatch(fetchDownloadDocumentSuccess());
        } else {
          const json = respsonse.json();
          dispatch(fetchDownloadDocumentFailure(json));
        }
      })
      .catch(error =>
        dispatch(fetchDownloadDocumentFailure(error))
      );
  };
}
