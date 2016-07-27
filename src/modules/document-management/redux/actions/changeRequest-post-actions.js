import {
  DM_POST_CHANGE_REQUEST_REQUEST,
  DM_POST_CHANGE_REQUEST_SUCCESS,
  DM_POST_CHANGE_REQUEST_FAILURE
} from '../constants/changeRequest-constants';

import { fetchChangeRequestSuccess } from './changeRequest-actions';

import utils from '../../../../utils';

// DATA - Async Action creators
// ChangeRequests
export function postChangeRequestRequest(postedObject, body, moduleId, url) {
  return {
    type: DM_POST_CHANGE_REQUEST_REQUEST,
    postedObject,
    body,
    moduleId,
    url
  };
}

export function postChangeRequestSuccess(json) {
  return {
    type: DM_POST_CHANGE_REQUEST_SUCCESS,
    changeRequest: json,
    receivedAt: Date.now()
  };
}

export function postChangeRequestFailure(error) {
  return {
    type: DM_POST_CHANGE_REQUEST_FAILURE,
    error
  };
}

export function postChangeRequest(state) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/dm/document/changerequest`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);
    // sHeaders.set('Debug', true);

    // const sBody = JSON.stringify(state);
    // utils.save(sBody);

    const sInit = {
      method: 'POST',
      headers: sHeaders,
      body: JSON.stringify(state)
    };

    dispatch(postChangeRequestRequest(state, sInit, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(postChangeRequestFailure(json));
        } else {
          dispatch(fetchChangeRequestSuccess(json));
          dispatch(postChangeRequestSuccess(json));
        }
      })
      .catch(error =>
        dispatch(postChangeRequestFailure(error))
      );
  };
}
