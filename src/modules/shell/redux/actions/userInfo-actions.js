import {
  SH_FETCH_USER_INFO_REQUEST,
  SH_FETCH_USER_INFO_SUCCESS,
  SH_FETCH_USER_INFO_FAILURE
} from '../constants/userInfo-constants';

import utils from '../../../../utils';

// Async Action creators
// Auth
export function fetchUserInfoRequest(object, url) {
  return {
    type: SH_FETCH_USER_INFO_REQUEST,
    object,
    url
  };
}

export function fetchUserInfoSuccess(globalSettings, json) {
  return {
    type: SH_FETCH_USER_INFO_SUCCESS,
    globalSettings,
    userInfo: json,
    receivedAt: Date.now()
  };
}

export function fetchUserInfoFailure(globalSettings, error) {
  return {
    type: SH_FETCH_USER_INFO_FAILURE,
    globalSettings,
    error
  };
}

export function fetchUserInfo() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, shSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/user/info`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', shSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchUserInfoRequest(sInit, url));
    return fetch(url, sInit)
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchUserInfoFailure(globalSettings, json));
        } else {
          dispatch(fetchUserInfoSuccess(globalSettings, json));
        }
      })
      .catch(error =>
        dispatch(fetchUserInfoFailure(globalSettings, error))
      );
  };
}
