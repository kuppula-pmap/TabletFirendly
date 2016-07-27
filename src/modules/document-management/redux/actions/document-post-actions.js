import {
  DM_POST_DOCUMENT_REQUEST,
  DM_POST_DOCUMENT_SUCCESS,
  DM_POST_DOCUMENT_FAILURE
} from '../constants/document-constants';

import { fetchDocumentSuccess } from './document-actions';

import utils from '../../../../utils';

// DATA - Async Action creators
// Documents
export function postDocumentRequest(postedObject, body, moduleId, url) {
  return {
    type: DM_POST_DOCUMENT_REQUEST,
    postedObject,
    body,
    moduleId,
    url
  };
}

export function postDocumentSuccess(json) {
  return {
    type: DM_POST_DOCUMENT_SUCCESS,
    document: json,
    receivedAt: Date.now()
  };
}

export function postDocumentFailure(error) {
  return {
    type: DM_POST_DOCUMENT_FAILURE,
    error
  };
}

export function postDocument(state) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/dm/document`;
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

    dispatch(postDocumentRequest(state, sInit, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(postDocumentFailure(json));
        } else {
          dispatch(fetchDocumentSuccess(json));
          dispatch(postDocumentSuccess(json));
        }
      })
      .catch(error =>
        dispatch(postDocumentFailure(error))
      );
  };
}
