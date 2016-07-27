import {
  SH_CUSTOM_SETTINGS_REQUEST,
  SH_CUSTOM_SETTINGS_SUCCESS,
  SH_CUSTOM_SETTINGS_FAILURE
} from '../constants/customSettings-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// ModuleMenus
export function fetchCustomSettingsRequest(moduleId, url) {
  return {
    type: SH_CUSTOM_SETTINGS_REQUEST,
    moduleId,
    url
  };
}

export function fetchCustomSettingsSuccess(json) {
  return {
    type: SH_CUSTOM_SETTINGS_SUCCESS,
    customSettings: json,
    receivedAt: Date.now()
  };
}

export function fetchCustomSettingsFailure(error) {
  return {
    type: SH_CUSTOM_SETTINGS_FAILURE,
    error
  };
}

export function fetchCustomSettings() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, shSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/utils/customsettings/0`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', shSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchCustomSettingsRequest(shSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchCustomSettingsFailure(json));
        } else {
          dispatch(fetchCustomSettingsSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchCustomSettingsFailure(error))
      );
  };
}
