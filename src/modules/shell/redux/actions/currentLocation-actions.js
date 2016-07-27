import {
  SH_POSTCURRENTLOCATION_REQUEST,
  SH_POSTCURRENTLOCATION_SUCCESS,
  SH_POSTCURRENTLOCATION_FAILURE
} from '../constants/currentLocation-constants';


import utils from '../../../../utils';

// DATA - Async Action creators
export function postCurrentLocationRequest(locationId, moduleId, url) {
  return {
    type: SH_POSTCURRENTLOCATION_REQUEST,
    locationId,
    moduleId,
    url
  };
}

export function postCurrentLocationSuccess(json) {
  return {
    type: SH_POSTCURRENTLOCATION_SUCCESS,
    currentLocation: json,
    receivedAt: Date.now()
  };
}

export function postCurrentLocationFailure(error) {
  return {
    type: SH_POSTCURRENTLOCATION_FAILURE,
    error
  };
}

export function postCurrentLocation(type, typeId) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, shSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/location/currentLocation/${type}/${typeId}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', shSettings.moduleId);

    const sInit = {
      method: 'POST',
      headers: sHeaders,
      body: JSON.stringify({})
    };

    dispatch(postCurrentLocationRequest(globalSettings.locationId, shSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(postCurrentLocationFailure(json));
        } else {
          dispatch(postCurrentLocationSuccess(json));
        }
      })
      .catch(error => {
        dispatch(postCurrentLocationFailure(error));
      });
  };
}
