import {
  SH_FETCH_MODULEMENU_SETUP_REQUEST,
  SH_FETCH_MODULEMENU_SETUP_SUCCESS,
  SH_FETCH_MODULEMENU_SETUP_FAILURE
} from '../constants/moduleMenuSetup-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// ModuleMenus
export function fetchModuleMenuSetupRequest(headerLang, moduleId, url) {
  return {
    type: SH_FETCH_MODULEMENU_SETUP_REQUEST,
    headerLang,
    moduleId,
    url
  };
}

export function fetchModuleMenuSetupSuccess(json) {
  return {
    type: SH_FETCH_MODULEMENU_SETUP_SUCCESS,
    moduleMenuSetup: json,
    receivedAt: Date.now()
  };
}

export function fetchModuleMenuSetupFailure(error) {
  return {
    type: SH_FETCH_MODULEMENU_SETUP_FAILURE,
    error
  };
}

export function fetchModuleMenuSetup(ParentId) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, shSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/modulemenus/allnestedbyuser/${ParentId}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', shSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchModuleMenuSetupRequest(globalLang.languageCode, shSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchModuleMenuSetupFailure(json));
        } else {
          dispatch(fetchModuleMenuSetupSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchModuleMenuSetupFailure(error))
      );
  };
}
