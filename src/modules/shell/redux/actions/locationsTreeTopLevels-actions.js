import {
  SH_LOCATIONS_TREETOPLEVELS_REQUEST,
  SH_LOCATIONS_TREETOPLEVELS_SUCCESS,
  SH_LOCATIONS_TREETOPLEVELS_FAILURE
} from '../constants/locations-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// ModuleMenus
export function fetchLocationsTreeTopLevelsRequest(moduleId, url) {
  return {
    type: SH_LOCATIONS_TREETOPLEVELS_REQUEST,
    moduleId,
    url
  };
}

export function fetchLocationsTreeTopLevelsSuccess(json) {
  return {
    type: SH_LOCATIONS_TREETOPLEVELS_SUCCESS,
    topLevels: json,
    receivedAt: Date.now()
  };
}

export function fetchLocationsTreeTopLevelsFailure(error) {
  return {
    type: SH_LOCATIONS_TREETOPLEVELS_FAILURE,
    error
  };
}

export function fetchLocationsTreeTopLevels() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, shSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/locations/toplevels`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', shSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchLocationsTreeTopLevelsRequest(shSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchLocationsTreeTopLevelsFailure(json));
        } else {
          dispatch(fetchLocationsTreeTopLevelsSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchLocationsTreeTopLevelsFailure(error))
      );
  };
}
