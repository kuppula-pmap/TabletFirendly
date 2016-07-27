import {
  SH_FETCH_FLATMODULEMENU_REQUEST,
  SH_FETCH_FLATMODULEMENU_SUCCESS,
  SH_FETCH_FLATMODULEMENU_FAILURE
} from '../constants/moduleMenu-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// ModuleMenus
export function fetchFlatModuleMenuRequest(moduleId, url) {
  return {
    type: SH_FETCH_FLATMODULEMENU_REQUEST,
    moduleId,
    url
  };
}

export function fetchFlatModuleMenuSuccess(json) {
  return {
    type: SH_FETCH_FLATMODULEMENU_SUCCESS,
    moduleMenu: json,
    receivedAt: Date.now()
  };
}

export function fetchFlatModuleMenuFailure(error) {
  return {
    type: SH_FETCH_FLATMODULEMENU_FAILURE,
    error
  };
}

export function fetchFlatModuleMenu() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, shSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/modulemenus/allbyuser`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', shSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchFlatModuleMenuRequest(shSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchFlatModuleMenuFailure(json));
        } else {
          dispatch(fetchFlatModuleMenuSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchFlatModuleMenuFailure(error))
      );
  };
}
