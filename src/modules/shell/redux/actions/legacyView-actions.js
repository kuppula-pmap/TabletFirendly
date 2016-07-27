import {
  SH_POST_LEGACYVIEW_REQUEST,
  SH_POST_LEGACYVIEW_SUCCESS,
  SH_POST_LEGACYVIEW_FAILURE
} from '../constants/legacyView-constants';

import utils from '../../../../utils';

// Async Action creators
// Auth
export function postLegacyViewRequest(url) {
  return {
    type: SH_POST_LEGACYVIEW_REQUEST,
    url
  };
}

export function postLegacyViewSuccess(json) {
  return {
    type: SH_POST_LEGACYVIEW_SUCCESS,
    legacyView: json,
    receivedAt: Date.now()
  };
}

export function postLegacyViewFailure(error) {
  return {
    type: SH_POST_LEGACYVIEW_FAILURE,
    error
  };
}

export function postLegacyView() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, shSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/user/home/false`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', shSettings.moduleId);

    const sInit = {
      method: 'POST',
      headers: sHeaders
    };

    dispatch(postLegacyViewRequest(url));
    return fetch(url, sInit)
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(postLegacyViewFailure(json));
        } else {
          dispatch(postLegacyViewSuccess(json));
        }
      })
      .catch(error =>
        dispatch(postLegacyViewFailure(error))
      );
  };
}
