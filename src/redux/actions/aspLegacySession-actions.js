import {
  POST_ASPLEGACYSESSION_REQUEST,
  POST_ASPLEGACYSESSION__SUCCESS,
  POST_ASPLEGACYSESSION__FAILURE,
} from '../constants/aspLegacySession-constants';

// DATA - Async Action creators
// AspLegacySession
export function postAspLegacySessionRequest(object, url) {
  return {
    type: POST_ASPLEGACYSESSION_REQUEST,
    object,
    url
  };
}

export function postAspLegacySessionSuccess(json) {
  return {
    type: POST_ASPLEGACYSESSION__SUCCESS,
    aspLegacySession: json,
    receivedAt: Date.now()
  };
}

export function postAspLegacySessionFailure(error) {
  return {
    type: POST_ASPLEGACYSESSION__FAILURE,
    error
  };
}

export function postAspLegacySession() {
  return (dispatch, getState) => {
    const globalSettings = getState().globalSettings;
    const {locationId, levelId, moduleId, topLevelId} = globalSettings;

    const url = '/RefreshASPSessions.asp?location_id=' + locationId + '&Level_id=' + levelId + '&Module_Id=' + moduleId + '&TopLevel_Id=' + topLevelId;
    let sHeaders = new Headers();
    sHeaders.append('Content-Type', 'application/json;charset=UTF-8');

    const sInit = {
      method: 'POST',
      headers: sHeaders,
      credentials: 'same-origin',
      body: JSON.stringify({})
    };

    dispatch(postAspLegacySessionRequest(sInit, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(postAspLegacySessionFailure(json));
        } else {
          dispatch(postAspLegacySessionSuccess(json));
        }
      })
      .catch(error =>
        dispatch(postAspLegacySessionFailure(error))
      );
  };
}
