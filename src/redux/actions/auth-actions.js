import {
  GLOBAL_FETCH_AUTH_REQUEST,
  GLOBAL_FETCH_AUTH_SUCCESS,
  GLOBAL_FETCH_AUTH_FAILURE
} from '../constants/auth-constants';

import {
  setAuthorizationToken,
  setLocationLevelName
} from './settings-actions';
import utils from '../../utils';

// Async Action creators
// Auth
export function fetchAuthRequest(object, url) {
  return {
    type: GLOBAL_FETCH_AUTH_REQUEST,
    object,
    url
  };
}

export function fetchAuthSuccess(globalSettings, json) {
  return {
    type: GLOBAL_FETCH_AUTH_SUCCESS,
    globalSettings,
    auth: json,
    receivedAt: Date.now()
  };
}

export function fetchAuthFailure(globalSettings, error) {
  return {
    type: GLOBAL_FETCH_AUTH_FAILURE,
    globalSettings,
    error
  };
}

export function fetchAuth(Username, Password, Algorithm, LocationLevelName) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang} = getState();

    const url = `${globalSettings.apiUrl}/papi/auth`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);

    const sInit = {
      method: 'POST',
      headers: sHeaders,
      body: JSON.stringify({
        Username,
        Password,
        Algorithm
      })
    };

    dispatch(fetchAuthRequest(sInit, url));
    return fetch(url, sInit)
      .then(response => {
        const token = response.headers.get('Authorization');
        if (token) {
          dispatch(setAuthorizationToken(token));
        }
        return response.json();
      })
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchAuthFailure(globalSettings, json));
        } else {
          dispatch(fetchAuthSuccess(globalSettings, json));

          // Set Location/Level Name in globalSettings.locationLevelName
          // Dispatch value: json.UserDetails.DefaultLocation.Name
          let defaultLocation = 'No Default Location';
          if (json.UserDetails) {
            if (json.UserDetails.DefaultLocation) {
              defaultLocation = json.UserDetails.DefaultLocation.Name;
            }
          }
          // This is also triggering the initial module render.
          // Do not remove this action.
          dispatch( setLocationLevelName(LocationLevelName ? LocationLevelName : defaultLocation) );
        }
      })
      .catch(error =>
        dispatch(fetchAuthFailure(globalSettings, error))
      );
  };
}
