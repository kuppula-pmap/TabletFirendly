import {
  SH_FETCH_MODULEMENU_REQUEST,
  SH_FETCH_MODULEMENU_SUCCESS,
  SH_FETCH_MODULEMENU_FAILURE
} from '../constants/moduleMenu-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// ModuleMenus
export function fetchModuleMenuRequest(headerLang, moduleId, url) {
  return {
    type: SH_FETCH_MODULEMENU_REQUEST,
    headerLang,
    moduleId,
    url
  };
}

export function fetchModuleMenuSuccess(json) {
  return {
    type: SH_FETCH_MODULEMENU_SUCCESS,
    moduleMenu: json,
    receivedAt: Date.now()
  };
}

export function fetchModuleMenuFailure(error) {
  return {
    type: SH_FETCH_MODULEMENU_FAILURE,
    error
  };
}

export function fetchModuleMenu() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, shSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/modulemenus/allnestedbyuser`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', shSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchModuleMenuRequest(globalLang.languageCode, shSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchModuleMenuFailure(json));
        } else {
          dispatch(fetchModuleMenuSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchModuleMenuFailure(error))
      );
  };
}
