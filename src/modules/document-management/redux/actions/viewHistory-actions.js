import {
  DM_FETCH_VIEW_HISTORY_REQUEST,
  DM_FETCH_VIEW_HISTORY_SUCCESS,
  DM_FETCH_VIEW_HISTORY_FAILURE
} from '../constants/viewHistory-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// Documents
export function fetchViewHistoryRequest(documentId, moduleId, url) {
  return {
    type: DM_FETCH_VIEW_HISTORY_REQUEST,
    documentId,
    moduleId,
    url
  };
}

export function fetchViewHistorySuccess(json) {
  return {
    type: DM_FETCH_VIEW_HISTORY_SUCCESS,
    viewHistory: json,
    receivedAt: Date.now()
  };
}

export function fetchViewHistoryFailure(error) {
  return {
    type: DM_FETCH_VIEW_HISTORY_FAILURE,
    error
  };
}

export function fetchViewHistory(documentVersionUId) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    // Pass in documentVersionUId to fetch view history.
    const url = `${globalSettings.apiUrl}/papi/dm/document/viewhistory?documentVersionUid=${documentVersionUId}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchViewHistoryRequest(documentVersionUId, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchViewHistoryFailure(json));
        } else {
          dispatch(fetchViewHistorySuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchViewHistoryFailure(error))
      );
  };
}
