import {
  SH_RECENT_LOCATIONS_LIST_REQUEST,
  SH_RECENT_LOCATIONS_LIST_SUCCESS,
  SH_RECENT_LOCATIONS_LIST_FAILURE
} from '../constants/locations-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// ModuleMenus
export function fetchRecentLocationsListRequest(topLevelId, moduleId, url) {
  return {
    type: SH_RECENT_LOCATIONS_LIST_REQUEST,
    topLevelId,
    moduleId,
    url
  };
}

export function fetchRecentLocationsListSuccess(json) {
  return {
    type: SH_RECENT_LOCATIONS_LIST_SUCCESS,
    locationsList: json,
    receivedAt: Date.now()
  };
}

export function fetchRecentLocationsListFailure(error) {
  return {
    type: SH_RECENT_LOCATIONS_LIST_FAILURE,
    error
  };
}

export function fetchRecentLocationsList() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, shSettings} = getState();
    const {topLevelId} = globalSettings;

    const url = `${globalSettings.apiUrl}/papi/locations/recentlocations/${topLevelId}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', shSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchRecentLocationsListRequest(topLevelId, shSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchRecentLocationsListFailure(json));
        } else {
          dispatch(fetchRecentLocationsListSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchRecentLocationsListFailure(error))
      );
  };
}
