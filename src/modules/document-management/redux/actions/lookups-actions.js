import {
  DM_FETCH_LOOKUPS_REQUEST,
  DM_FETCH_LOOKUPS_SUCCESS,
  DM_FETCH_LOOKUPS_FAILURE
} from '../constants/lookups-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// Lookupss
export function fetchLookupsRequest(moduleId, url) {
  return {
    type: DM_FETCH_LOOKUPS_REQUEST,
    moduleId,
    url
  };
}

export function fetchLookupsSuccess(json) {
  return {
    type: DM_FETCH_LOOKUPS_SUCCESS,
    lookups: json,
    receivedAt: Date.now()
  };
}

export function fetchLookupsFailure(error) {
  return {
    type: DM_FETCH_LOOKUPS_FAILURE,
    error
  };
}

export function fetchLookups() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/dm/lookups`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchLookupsRequest(dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchLookupsFailure(json));
        } else {
          dispatch(fetchLookupsSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchLookupsFailure(error))
      );
  };
}
