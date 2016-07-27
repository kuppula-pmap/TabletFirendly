import {
  DM_FETCH_PERMISSIONS_REQUEST,
  DM_FETCH_PERMISSIONS_SUCCESS,
  DM_FETCH_PERMISSIONS_FAILURE
} from '../constants/permissions-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// Permissions
export function fetchPermissionsRequest(moduleId, url) {
  return {
    type: DM_FETCH_PERMISSIONS_REQUEST,
    moduleId,
    url
  };
}

export function fetchPermissionsSuccess(json) {
  return {
    type: DM_FETCH_PERMISSIONS_SUCCESS,
    permissions: json,
    receivedAt: Date.now()
  };
}

export function fetchPermissionsFailure(error) {
  return {
    type: DM_FETCH_PERMISSIONS_FAILURE,
    error
  };
}

export function fetchPermissions() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/user/permissions`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchPermissionsRequest(dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchPermissionsFailure(json));
        } else {
          dispatch(fetchPermissionsSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchPermissionsFailure(error))
      );
  };
}
