import {
  DM_FETCH_VERSION_HISTORY_REQUEST,
  DM_FETCH_VERSION_HISTORY_SUCCESS,
  DM_FETCH_VERSION_HISTORY_FAILURE
} from '../constants/versionHistory-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// Documents
export function fetchVersionHistoryRequest() {
  return {
    type: DM_FETCH_VERSION_HISTORY_REQUEST
  };
}

export function fetchVersionHistorySuccess(json) {
  return {
    type: DM_FETCH_VERSION_HISTORY_SUCCESS,
    versionHistory: json,
    receivedAt: Date.now()
  };
}

export function fetchVersionHistoryFailure(error) {
  return {
    type: DM_FETCH_VERSION_HISTORY_FAILURE,
    error
  };
}

export function fetchVersionHistory(documentUid) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang} = getState();
    // https://devind.pmapconnect.com:558/papi/v1/dm/document/versionhistory?docId
    const url = `${globalSettings.apiUrl}/papi/v1/dm/document/versionhistory?docId=${documentUid}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    // sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchVersionHistoryRequest(sInit));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchVersionHistoryFailure(json));
        } else {
          dispatch(fetchVersionHistorySuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchVersionHistoryFailure(error))
      );
  };
}
