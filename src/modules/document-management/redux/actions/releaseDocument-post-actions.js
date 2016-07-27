import {
  DM_POST_RELEASE_DOCUMENT_REQUEST,
  DM_POST_RELEASE_DOCUMENT_SUCCESS,
  DM_POST_RELEASE_DOCUMENT_FAILURE
} from '../constants/releaseDocument-constants';

import { fetchDocumentSuccess } from '../actions/document-actions';


import utils from '../../../../utils';

// DATA - Async Action creators
// ReleaseDocuments
export function postReleaseDocumentRequest(postedObject, body, moduleId, url) {
  return {
    type: DM_POST_RELEASE_DOCUMENT_REQUEST,
    postedObject,
    body,
    moduleId,
    url
  };
}

export function postReleaseDocumentSuccess(json) {
  return {
    type: DM_POST_RELEASE_DOCUMENT_SUCCESS,
    releaseDocument: json,
    receivedAt: Date.now()
  };
}

export function postReleaseDocumentFailure(error) {
  return {
    type: DM_POST_RELEASE_DOCUMENT_FAILURE,
    error
  };
}

export function postReleaseDocument(state) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/dm/document/release`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);
    // sHeaders.set('Debug', true);

    // const sBody = JSON.stringify(state);
    // utils.save(sBody);

    const sInit = {
      method: 'POST',
      headers: sHeaders,
      body: JSON.stringify(state)
    };

    dispatch(postReleaseDocumentRequest(state, sInit, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(postReleaseDocumentFailure(json));
        } else {
          dispatch(postReleaseDocumentSuccess(json));
          dispatch(fetchDocumentSuccess(json));
        }
      })
      .catch(error =>
        dispatch(postReleaseDocumentFailure(error))
      );
  };
}
