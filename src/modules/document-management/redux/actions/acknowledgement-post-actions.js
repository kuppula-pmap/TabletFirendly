import {
  DM_POST_ACKNOWLEDGEMENT_REQUEST,
  DM_POST_ACKNOWLEDGEMENT_SUCCESS,
  DM_POST_ACKNOWLEDGEMENT_FAILURE
} from '../constants/acknowledgement-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// ChangeRequests
export function postAcknowledgementRequest(uid, moduleId, url) {
  return {
    type: DM_POST_ACKNOWLEDGEMENT_REQUEST,
    uid,
    moduleId,
    url
  };
}

export function postAcknowledgementSuccess(json) {
  return {
    type: DM_POST_ACKNOWLEDGEMENT_SUCCESS,
    acknowledgement: json,
    receivedAt: Date.now()
  };
}

export function postAcknowledgementFailure(error) {
  return {
    type: DM_POST_ACKNOWLEDGEMENT_FAILURE,
    error
  };
}

export function postAcknowledgement(uid) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/dm/document/acknowledge/${uid}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);
    sHeaders.set('UserId', globalSettings.userId);
    // sHeaders.set('Debug', true);

    // const sBody = JSON.stringify(state);
    // utils.save(sBody);

    const sInit = {
      method: 'POST',
      headers: sHeaders,
      body: JSON.stringify({})
    };

    dispatch(postAcknowledgementRequest(uid, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(postAcknowledgementFailure(json));
        } else {
          dispatch(postAcknowledgementSuccess(json));
        }
      })
      .catch(error =>
        dispatch(postAcknowledgementFailure(error))
      );
  };
}
