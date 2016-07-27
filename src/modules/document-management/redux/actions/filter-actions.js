import {
  DM_FETCH_FILTER_REQUEST,
  DM_FETCH_FILTER_SUCCESS,
  DM_FETCH_FILTER_FAILURE
} from '../constants/filter-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// Filter
export function fetchFilterRequest(query, criteria, moduleId, url) {
  return {
    type: DM_FETCH_FILTER_REQUEST,
    query,
    criteria,
    moduleId,
    url
  };
}

export function fetchFilterSuccess(json) {
  return {
    type: DM_FETCH_FILTER_SUCCESS,
    filter: json,
    receivedAt: Date.now()
  };
}

export function fetchFilterFailure(error) {
  return {
    type: DM_FETCH_FILTER_FAILURE,
    error
  };
}

export function fetchFilter() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings, dmSearch} = getState();
    const q = dmSearch.query ? encodeURIComponent(dmSearch.query) : '';
    const f = dmSearch.criteria ? dmSearch.criteria : '';

    const url = `${globalSettings.apiUrl}/papi/dm/documents?q=${q}${f}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchFilterRequest(q, f, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchFilterFailure(json));
        } else {
          dispatch(fetchFilterSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchFilterFailure(error))
      );
  };
}
