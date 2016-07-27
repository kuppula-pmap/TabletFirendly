import {
  DM_FETCH_CHANGE_REQUEST_REQUEST,
  DM_FETCH_CHANGE_REQUEST_SUCCESS,
  DM_FETCH_CHANGE_REQUEST_FAILURE
} from '../constants/changeRequest-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// Documents
export function fetchChangeRequestRequest(documentId, moduleId, url) {
  return {
    type: DM_FETCH_CHANGE_REQUEST_REQUEST,
    documentId,
    moduleId,
    url
  };
}

export function fetchChangeRequestSuccess(json) {
  return {
    type: DM_FETCH_CHANGE_REQUEST_SUCCESS,
    changeRequests: json,
    receivedAt: Date.now()
  };
}

export function fetchChangeRequestFailure(error) {
  return {
    type: DM_FETCH_CHANGE_REQUEST_FAILURE,
    error
  };
}

export function fetchChangeRequest(documentId) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/dm/document/ChangeRequests?DocumentVersionUid=${documentId}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchChangeRequestRequest(documentId, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchChangeRequestFailure(json));
        } else {
          dispatch(fetchChangeRequestSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchChangeRequestFailure(error))
      );
  };
}
