import {
  SH_LOCATIONS_TREE_REQUEST,
  SH_LOCATIONS_TREE_SUCCESS,
  SH_LOCATIONS_TREE_FAILURE
} from '../constants/locations-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// ModuleMenus
export function fetchLocationsTreeRequest(topLevelId, moduleId, url) {
  return {
    type: SH_LOCATIONS_TREE_REQUEST,
    topLevelId,
    moduleId,
    url
  };
}

export function fetchLocationsTreeSuccess(json) {
  return {
    type: SH_LOCATIONS_TREE_SUCCESS,
    locationsTree: json,
    receivedAt: Date.now()
  };
}

export function fetchLocationsTreeFailure(error) {
  return {
    type: SH_LOCATIONS_TREE_FAILURE,
    error
  };
}

export function fetchLocationsTree() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, shSettings} = getState();
    const {topLevelId} = globalSettings;

    const url = `${globalSettings.apiUrl}/papi/locations/allnested/${topLevelId}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', shSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchLocationsTreeRequest(topLevelId, shSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchLocationsTreeFailure(json));
        } else {
          dispatch(fetchLocationsTreeSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchLocationsTreeFailure(error))
      );
  };
}
