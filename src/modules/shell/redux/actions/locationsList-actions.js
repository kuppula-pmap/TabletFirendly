import {
  SH_LOCATIONS_LIST_REQUEST,
  SH_LOCATIONS_LIST_SUCCESS,
  SH_LOCATIONS_LIST_FAILURE
} from '../constants/locations-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// ModuleMenus
export function fetchLocationsListRequest(topLevelId, moduleId, url) {
  return {
    type: SH_LOCATIONS_LIST_REQUEST,
    topLevelId,
    moduleId,
    url
  };
}

export function fetchLocationsListSuccess(json) {
  return {
    type: SH_LOCATIONS_LIST_SUCCESS,
    locationsList: json,
    receivedAt: Date.now()
  };
}

export function fetchLocationsListFailure(error) {
  return {
    type: SH_LOCATIONS_LIST_FAILURE,
    error
  };
}

export function fetchLocationsList() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, shSettings} = getState();
    const {topLevelId} = globalSettings;

    const url = `${globalSettings.apiUrl}/papi/locations/allByRootLevel/${topLevelId}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', shSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchLocationsListRequest(topLevelId, shSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchLocationsListFailure(json));
        } else {
          dispatch(fetchLocationsListSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchLocationsListFailure(error))
      );
  };
}
